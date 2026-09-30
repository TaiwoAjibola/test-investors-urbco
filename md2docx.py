#!/usr/bin/env python3
import re, sys
from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

SRC = "/Users/ajibola/Urbco Investors App/urbco-agent/APPLICATION_FLOW.md"
OUT = "/Users/ajibola/Urbco Investors App/urbco-agent/APPLICATION_FLOW.docx"

doc = Document()

# base style
normal = doc.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)

MONO = "Consolas"

def add_runs(par, text):
    # parse inline **bold** and `code`
    pattern = re.compile(r"(\*\*([^*]+)\*\*|`([^`]+)`)")
    pos = 0
    for m in pattern.finditer(text):
        if m.start() > pos:
            par.add_run(text[pos:m.start()])
        if m.group(2) is not None:
            r = par.add_run(m.group(2))
            r.bold = True
        elif m.group(3) is not None:
            r = par.add_run(m.group(3))
            r.font.name = MONO
            r.font.size = Pt(9.5)
        pos = m.end()
    if pos < len(text):
        par.add_run(text[pos:])

with open(SRC, encoding="utf-8") as f:
    lines = f.read().split("\n")

i = 0
n = len(lines)
in_code = False
code_buf = []

def flush_code():
    global code_buf
    if not code_buf:
        return
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Pt(18)
    run = p.add_run("\n".join(code_buf))
    run.font.name = MONO
    run.font.size = Pt(8.5)
    run.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    # light shading via paragraph border not set; keep simple
    code_buf = []

while i < n:
    line = lines[i]
    if line.strip().startswith("```"):
        if in_code:
            flush_code()
            in_code = False
        else:
            in_code = True
        i += 1
        continue
    if in_code:
        code_buf.append(line)
        i += 1
        continue
    stripped = line.strip()
    if stripped == "":
        i += 1
        continue
    if stripped == "---":
        doc.add_paragraph().add_run("_" * 40).font.color.rgb = RGBColor(0xBB,0xBB,0xBB)
        i += 1
        continue
    if stripped.startswith(">"):
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Pt(14)
        r = p.add_run(stripped.lstrip("> ").rstrip())
        r.italic = True
        add_runs(p, "")
        # re-add with inline parse
        p.clear()
        r = p.add_run(stripped.lstrip("> ").rstrip())
        r.italic = True
        i += 1
        continue
    m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
    if m:
        level = len(m.group(1))
        style = {1:"Title",2:"Heading 1",3:"Heading 2",4:"Heading 3",5:"Heading 4",6:"Heading 5"}[level]
        h = doc.add_paragraph()
        h.style = doc.styles[style]
        add_runs(h, m.group(2))
        i += 1
        continue
    m = re.match(r"^-\s+\[[ xX]\]\s+(.*)$", stripped)
    if m:
        p = doc.add_paragraph(style="List Bullet")
        p.add_run("☐ " if "[ ]" in stripped else "☑ ")
        add_runs(p, m.group(1))
        i += 1
        continue
    if stripped.startswith("- "):
        p = doc.add_paragraph(style="List Bullet")
        add_runs(p, stripped[2:])
        i += 1
        continue
    if re.match(r"^\d+\.\s+", stripped):
        p = doc.add_paragraph(style="List Number")
        add_runs(p, re.sub(r"^\d+\.\s+", "", stripped))
        i += 1
        continue
    # normal paragraph
    p = doc.add_paragraph()
    add_runs(p, stripped)
    i += 1

flush_code()
doc.save(OUT)
print("saved", OUT)
