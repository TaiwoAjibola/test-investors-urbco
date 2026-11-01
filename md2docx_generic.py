#!/usr/bin/env python3
"""Generic Markdown -> .docx converter (no external md lib required).
Handles: headings (#..######), bullet/numbered lists, - [ ] checkboxes,
fenced code blocks, blockquotes, inline **bold** and `code`, tables (| .. |),
and horizontal rules (---)."""
import re, sys
from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

MONO = "Consolas"

def add_runs(par, text):
    pattern = re.compile(r"(\*\*([^*]+)\*\*|`([^`]+)`)")
    pos = 0
    for m in pattern.finditer(text):
        if m.start() > pos:
            par.add_run(text[pos:m.start()])
        if m.group(2) is not None:
            r = par.add_run(m.group(2)); r.bold = True
        elif m.group(3) is not None:
            r = par.add_run(m.group(3)); r.font.name = MONO; r.font.size = Pt(9.5)
        pos = m.end()
    if pos < len(text):
        par.add_run(text[pos:])

def convert(src, out):
    doc = Document()
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"; normal.font.size = Pt(11)

    with open(src, encoding="utf-8") as f:
        lines = f.read().split("\n")

    i, n = 0, len(lines)
    in_code, code_buf = False, []
    table_buf = []

    def flush_code():
        nonlocal code_buf
        if code_buf:
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Pt(18)
            r = p.add_run("\n".join(code_buf))
            r.font.name = MONO; r.font.size = Pt(8.5)
            r.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
            code_buf = []

    def flush_table():
        nonlocal table_buf
        if not table_buf:
            return
        # drop separator row (---|---)
        rows = [r for r in table_buf if not re.match(r"^\s*\|?[\s:-]+\|", r)]
        if not rows:
            table_buf = []; return
        cells0 = [c.strip() for c in rows[0].strip().strip("|").split("|")]
        t = doc.add_table(rows=len(rows), cols=max(len(cells0),1))
        t.style = "Light Grid Accent 1"
        for ri, row in enumerate(rows):
            cells = [c.strip() for c in row.strip().strip("|").split("|")]
            for ci, c in enumerate(cells):
                if ci < len(t.columns):
                    add_runs(t.cell(ri, ci).paragraphs[0], c)
        table_buf = []

    while i < n:
        line = lines[i]
        if line.strip().startswith("```"):
            if in_code:
                flush_code(); in_code = False
            else:
                flush_table(); in_code = True
            i += 1; continue
        if in_code:
            code_buf.append(line); i += 1; continue
        stripped = line.strip()
        if stripped == "":
            flush_table(); i += 1; continue
        if stripped == "---":
            flush_table()
            doc.add_paragraph().add_run("_"*40).font.color.rgb = RGBColor(0xBB,0xBB,0xBB)
            i += 1; continue
        if stripped.startswith("|") and "|" in stripped[1:]:
            table_buf.append(stripped); i += 1; continue
        flush_table()
        if stripped.startswith(">"):
            p = doc.add_paragraph(); p.paragraph_format.left_indent = Pt(14)
            r = p.add_run(stripped.lstrip("> ").rstrip()); r.italic = True
            i += 1; continue
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            style = {1:"Title",2:"Heading 1",3:"Heading 2",4:"Heading 3",5:"Heading 4",6:"Heading 5"}[level]
            h = doc.add_paragraph(); h.style = doc.styles[style]
            add_runs(h, m.group(2)); i += 1; continue
        m = re.match(r"^-\s+\[[ xX]\]\s+(.*)$", stripped)
        if m:
            p = doc.add_paragraph(style="List Bullet")
            p.add_run("☐ " if "[ ]" in stripped else "☑ "); add_runs(p, m.group(1))
            i += 1; continue
        if stripped.startswith("- "):
            p = doc.add_paragraph(style="List Bullet"); add_runs(p, stripped[2:]); i += 1; continue
        if re.match(r"^\d+\.\s+", stripped):
            p = doc.add_paragraph(style="List Number")
            add_runs(p, re.sub(r"^\d+\.\s+", "", stripped)); i += 1; continue
        p = doc.add_paragraph(); add_runs(p, stripped); i += 1

    flush_code(); flush_table()
    doc.save(out)
    print("saved", out)

if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else "EXECUTIVE_SUMMARY.md"
    out = sys.argv[2] if len(sys.argv) > 2 else src.rsplit(".",1)[0] + ".docx"
    convert(src, out)
