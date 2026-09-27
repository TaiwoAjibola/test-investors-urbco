"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Shield, Crown, Anchor, ArrowRight, Calculator, CheckCircle, MapPin,
  TrendingUp, Landmark, Briefcase, Users, Menu, X, Sparkles, FileCheck, Wallet, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/stores/appStore";
import { formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
];

export default function LandingPage() {
  const { properties } = useAppStore();
  const [activeTrack, setActiveTrack] = useState<"all" | "foundry" | "harbor">("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcAmount, setCalcAmount] = useState(50000000);
  const [calcTerm, setCalcTerm] = useState(3);

  const foundryProperties = properties.filter((p) => p.targetTrack === "foundry" || p.targetTrack === "both");
  const harborProperties = properties.filter((p) => p.targetTrack === "harbor" || p.targetTrack === "both");
  const displayedProperties = activeTrack === "foundry" ? foundryProperties : activeTrack === "harbor" ? harborProperties : properties.slice(0, 4);

  const calcYield = activeTrack === "harbor" ? 18 : 28;
  const calcReturn = Math.round(calcAmount * (calcYield / 100) * calcTerm);

  const stats = [
    { label: "Assets Under Management", value: "₦580B+", sub: "Across Lagos, Abuja & PH", icon: Building2 },
    { label: "Trustee-Secured Capital", value: "₦45B+", sub: "Held in independent escrow", icon: Shield },
    { label: "Average Term Yield", value: "18–28%", sub: "Paid quarterly in-app", icon: TrendingUp },
    { label: "Principal Loss Record", value: "Zero", sub: "Since inception", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-surface-sunken font-sans selection:bg-brand-600 selection:text-white">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Urbco home">
            <img src="/urbco-logo.svg" alt="Urbco" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/signup" className="hidden sm:block">
              <Button size="sm" className="px-4">Get Started</Button>
            </Link>
            <Link href="/auth/signup" className="sm:hidden">
              <Button size="sm">Get Started</Button>
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-line bg-white text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t border-line bg-white md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden border-b border-line bg-white">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[320px] w-[90vw] max-w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[100px] sm:h-[520px]"
            style={{ background: "radial-gradient(closest-side, rgba(135,15,115,0.16), rgba(212,160,101,0.10), transparent)" }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700"
              >
                <Shield className="h-3.5 w-3.5" />
                Trustee-secured real estate investing
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                Institutional-grade real estate,{" "}
                <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                  accessible to everyone
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                Urbco gives you two ways to own Nigerian real estate — a high-value institutional track for
                large capital, and a fractional track for building wealth steadily. Capital is held by an
                independent trustee and released against verified milestones.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
              >
                <Link href="/auth/signup" className="sm:w-auto">
                  <Button size="lg" className="w-full shadow-lg shadow-brand-600/20 sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services" className="sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore our services
                  </Button>
                </Link>
              </motion.div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-brand-600" />CAC-registered trustee custody</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-brand-600" />SEC-compliant onboarding</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-brand-600" />Quarterly distributions</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-line px-0 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-5 sm:p-6">
                <s.icon className="mb-3 h-5 w-5 text-brand-600" />
                <div className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs font-semibold text-slate-700">{s.label}</div>
                <div className="mt-0.5 text-xs text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TWO TRACKS ============ */}
        <section id="tracks" className="border-b border-line bg-surface-sunken py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 border-brand-200 bg-brand-50 text-brand-700">Two ways to invest</Badge>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Choose the track that fits your capital
              </h2>
              <p className="mt-4 text-slate-600">
                Both tracks are trustee-secured and pay quarterly. The difference is ticket size, structure,
                and how you participate in the asset.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {/* Foundry */}
              <Card className="flex flex-col border-line hover:border-accent-300 hover:shadow-lifted">
                <CardContent className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                      <Crown className="h-4.5 w-4.5" />
                    </span>
                    <Badge className="bg-accent-500 text-slate-900">High-value track</Badge>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">Institutional Track</h3>
                  <p className="mt-1 text-sm font-semibold text-accent-700">Tickets from ₦200M</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    For family offices, HNWIs and institutions deploying large capital into completed and
                    near-completion assets. Positions are held as notes with defined exit terms and direct
                    asset-level reporting.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {[
                      "₦200M+ minimum allocation",
                      "Single-ticket or structured notes",
                      "Priority secondary-transfer window",
                      "Dedicated advisor and tax reporting",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup?track=foundry" className="mt-auto pt-8">
                    <Button variant="outline" className="w-full border-accent-400 text-accent-800 hover:bg-accent-50">
                      Apply for institutional access <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Harbor */}
              <Card className="flex flex-col border-line hover:border-brand-300 hover:shadow-lifted">
                <CardContent className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Anchor className="h-4.5 w-4.5" />
                    </span>
                    <Badge className="bg-brand-600 text-white">Fractional track</Badge>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">Fractional Track</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-700">Entry from ₦100K</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    For individuals and families building wealth over time. Buy fractions of income-producing
                    assets, collect quarterly dividends in-app, and watch your position appreciate.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {[
                      "₦100K minimum entry ticket",
                      "Fractional ownership certificates",
                      "Quarterly wallet dividends",
                      "Milestone-gated title on request",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup?track=harbor" className="mt-auto pt-8">
                    <Button className="w-full">
                      Start fractional investing <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ============ ASSET PREVIEW ============ */}
        <section className="border-b border-line bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Currently open for allocation
                </h2>
                <p className="mt-3 text-slate-600">
                  A sample of live assets. Sign in to see funding progress, documents and milestone schedules.
                </p>
              </div>

              {/* Track filter */}
              <div className="inline-flex w-full shrink-0 gap-1 rounded-xl border border-line bg-surface-sunken p-1 sm:w-auto" role="tablist" aria-label="Filter assets by track">
                {([
                  { key: "all", label: "All" },
                  { key: "foundry", label: "Institutional" },
                  { key: "harbor", label: "Fractional" },
                ] as const).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTrack(t.key)}
                    role="tab"
                    aria-selected={activeTrack === t.key}
                    className={`flex-1 cursor-pointer rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-200 sm:flex-none ${
                      activeTrack === t.key ? "bg-white text-slate-900 shadow-soft" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayedProperties.map((p) => (
                <Card key={p.id} className="group cursor-pointer overflow-hidden border-line transition-shadow hover:shadow-lifted">
                  <div className="relative h-40 overflow-hidden bg-surface-muted">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      <Badge
                        className={
                          p.developmentStage === "pre-development"
                            ? "bg-brand-600 text-white"
                            : "bg-emerald-600 text-white"
                        }
                      >
                        {p.developmentStage === "pre-development" ? "Pre-dev" : "Post-dev"}
                      </Badge>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 shadow-soft backdrop-blur">
                      <span className="text-xs font-bold text-emerald-700">{formatPercentage(p.projectedROI)} ROI</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-slate-900">{p.name}</h3>
                    <p className="mt-1 flex items-center text-xs text-slate-500">
                      <MapPin className="mr-1 h-3 w-3" />{p.location}
                    </p>
                    <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                      <div>
                        <div className="text-[11px] text-slate-500">From</div>
                        <div className="text-sm font-bold text-slate-900">{formatCurrency(p.minimumInvestment || p.costPerFraction)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-slate-500">Valuation</div>
                        <div className="text-sm font-semibold text-slate-700">{formatCompactNumber(p.propertyValue)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="outline">
                  Sign in to browse all assets <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============ CALCULATOR ============ */}
        <section className="border-b border-line bg-surface-sunken py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Estimate your returns
              </h2>
              <p className="mt-3 text-slate-600">
                Indicative projections across both tracks. Actual returns vary by asset.
              </p>
            </div>

            <Card className="mt-12 border-line shadow-card">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="calc-amount">Capital (₦)</Label>
                    <Input
                      id="calc-amount"
                      type="number"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="mt-2"
                      min={0}
                      step={500000}
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {[5000000, 25000000, 50000000, 200000000].map((v) => (
                        <button
                          key={v}
                          onClick={() => setCalcAmount(v)}
                          className="cursor-pointer rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                        >
                          {formatCompactNumber(v)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Term</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[1, 3, 5].map((y) => (
                        <button
                          key={y}
                          onClick={() => setCalcTerm(y)}
                          className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                            calcTerm === y
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-line bg-white text-slate-600 hover:border-brand-300"
                          }`}
                        >
                          {y} {y === 1 ? "yr" : "yrs"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-line bg-surface-sunken p-5">
                    <div className="text-xs font-semibold text-slate-500">Track yield</div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-slate-900">{calcYield}%</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {activeTrack === "harbor" ? "Fractional" : activeTrack === "foundry" ? "Institutional" : "Blended average"}
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface-sunken p-5">
                    <div className="text-xs font-semibold text-slate-500">Est. total return</div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-brand-700">{formatCurrency(calcReturn)}</div>
                    <div className="mt-0.5 text-xs text-slate-500">Over {calcTerm} {calcTerm === 1 ? "year" : "years"}</div>
                  </div>
                  <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
                    <div className="text-xs font-semibold text-brand-700">Payout cadence</div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-brand-800">Quarterly</div>
                    <div className="mt-0.5 text-xs text-brand-700/80">Credited to your wallet</div>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-slate-500">
                  Projections are illustrative and not a guarantee of returns. Capital is at risk. See our
                  services page for full terms and risk disclosures.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============ INVESTOR TYPES ============ */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Built for every kind of investor
              </h2>
              <p className="mt-3 text-slate-600">
                Verification requirements scale with how you invest — so individuals onboard in minutes and
                institutions get a full KYB review.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                { icon: Sparkles, title: "Individuals", body: "Complete identity verification in-app and start from ₦100K. No paperwork queues.", cta: "Start with ₦100K" },
                { icon: Briefcase, title: "Family Offices", body: "Dedicated onboarding with AUM evidence, trustee documentation and a named advisor.", cta: "Talk to an advisor" },
                { icon: Landmark, title: "Institutions", body: "Full KYB: CAC verification, UBO identification and sanctions/PEP screening.", cta: "Institutional onboarding" },
              ].map((t) => (
                <Card key={t.title} className="border-line">
                  <CardContent className="p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-slate-900">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
                    <Link
                      href="/auth/signup"
                      className="mt-5 inline-flex items-center text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                    >
                      {t.cta} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="border-t border-line bg-surface-sunken py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                How your money is protected
              </h2>
              <p className="mt-3 text-slate-600">A four-step custody chain on every single allocation.</p>
            </div>

            <ol className="mt-14 grid gap-6 md:grid-cols-4">
              {[
                { icon: FileCheck, step: "01", title: "Terms accepted", body: "You sign the offering terms and payment instruction for your allocation." },
                { icon: Wallet, step: "02", title: "Payment received", body: "Funds are confirmed and lodged with the independent trustee." },
                { icon: Shield, step: "03", title: "Reconciled", body: "An independent reviewer reconciles funds against the units issued." },
                { icon: Landmark, step: "04", title: "Released", body: "Capital and title release only against verified milestones." },
              ].map((s) => (
                <li key={s.step} className="relative rounded-xl border border-line bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-2xl font-extrabold text-slate-200">{s.step}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="border-t border-line bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Ready to own a piece of Nigeria&apos;s growth?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Create an account, complete verification, and start allocating in minutes.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full shadow-lg shadow-brand-600/20 sm:w-auto">
                  Create your account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Read our services</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-xs">
              <img src="/urbco-logo.svg" alt="Urbco" className="h-8 w-auto" />
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Trustee-secured real estate investing for individuals, family offices and institutions in Nigeria.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Explore</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {NAV_LINKS.map((l) => (
                    <li key={l.href}><Link href={l.href} className="text-slate-600 transition-colors hover:text-brand-700">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Account</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link href="/auth/login" className="text-slate-600 transition-colors hover:text-brand-700">Log in</Link></li>
                  <li><Link href="/auth/signup" className="text-slate-600 transition-colors hover:text-brand-700">Get started</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Legal</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><span className="text-slate-400">Trustee disclosure</span></li>
                  <li><span className="text-slate-400">Risk factors</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 Urbco. All rights reserved.</p>
            <p>Capital is at risk. Past performance is not indicative of future results.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
