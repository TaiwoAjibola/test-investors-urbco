"use client";

import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Award,
  LineChart,
  Wallet,
  Compass,
  Crown,
  Anchor,
  Layers,
  ChevronRight,
  Briefcase,
  Building,
  Check,
  Calculator,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/stores/appStore";
import { formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [activeTrack, setActiveTrack] = useState<"all" | "foundry" | "harbor">("all");
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000000); // default ₦50M
  const [calculatorTrack, setCalculatorTrack] = useState<"foundry" | "harbor">("foundry");

  const { properties } = useAppStore();
  const foundryProperties = properties.filter((p) => p.targetTrack === "foundry" || p.targetTrack === "both");
  const harborProperties = properties.filter((p) => p.targetTrack === "harbor" || p.targetTrack === "both");
  const displayedProperties = activeTrack === "foundry" ? foundryProperties : activeTrack === "harbor" ? harborProperties : properties.slice(0, 4);

  // ROI Calculator Math
  const annualYield = calculatorTrack === "foundry" ? 0.28 : 0.18; // 28% for Foundry vs 18% for Harbor
  const calculateReturn = (amount: number, years: number) => {
    return Math.round(amount * Math.pow(1 + annualYield, years) - amount);
  };

  const yearScenarios = [1, 3, 5].map((years) => {
    const returns = calculateReturn(investmentAmount, years);
    return { years, returns, total: investmentAmount + returns };
  });

  const stats = [
    { label: "Institutional Assets Managed", value: "₦580B+", sub: "> $380M Portfolio Scale", icon: Building2 },
    { label: "Trustee-Secured Capital", value: "₦45B+", sub: "Zero Principal Loss Record", icon: Shield },
    { label: "Opco Foundry Target Ticket", value: "₦200M+", sub: "HNWI & Institutional Scale", icon: Crown },
    { label: "Opco Harbor Entry Ticket", value: "₦100K", sub: "Accessible Retail Fractional", icon: Anchor },
  ];

  return (
    <div className="min-h-screen bg-[#07050A] text-slate-100 font-sans selection:bg-[#D4A065] selection:text-black">
      {/* ============ HEADER NAVIGATION ============ */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
          <div className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-[#120F1A]/85 px-6 shadow-[0_8px_30px_rgb(0_0_0/0.45)] backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-3">
              <img src="/urbco-logo-white.svg" alt="Urbco" className="h-9" />
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link href="#ecosystems" className="text-sm font-medium text-slate-300 transition-colors hover:text-[#D4A065]">
                Ecosystems
              </Link>
              <Link href="#foundry" className="text-sm font-medium text-amber-300/90 transition-colors hover:text-amber-200 flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5 text-amber-400" />
                Opco Foundry
              </Link>
              <Link href="#harbor" className="text-sm font-medium text-cyan-300/90 transition-colors hover:text-cyan-200 flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 text-cyan-400" />
                Opco Harbor
              </Link>
              <Link href="/marketplace" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                Marketplace
              </Link>
              <Link href="/about" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                About Us
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:block">
                Sign In
              </Link>
              <Link href="/auth/signup">
                <Button variant="premium" size="sm" className="rounded-xl px-4 font-semibold shadow-lg shadow-amber-500/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ============ DUAL HERO SECTION ============ */}
        <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
          {/* Ambient Glow Effects */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-600/15 via-purple-900/10 to-cyan-600/15 blur-[140px]" />
          <div className="pointer-events-none absolute top-1/4 right-0 h-[450px] w-[450px] rounded-full bg-[#D4A065]/10 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 left-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center relative z-10">
            {/* Top Pill Switcher */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md mb-8"
            >
              <button
                onClick={() => setActiveTrack("all")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTrack === "all" ? "bg-white/15 text-white shadow-inner" : "text-slate-400 hover:text-white"
                }`}
              >
                All Ecosystems
              </button>
              <button
                onClick={() => setActiveTrack("foundry")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTrack === "foundry"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold shadow-lg shadow-amber-500/20"
                    : "text-amber-400/80 hover:text-amber-300"
                }`}
              >
                <Crown className="h-3.5 w-3.5" />
                Opco Foundry (HNWI & Institutional)
              </button>
              <button
                onClick={() => setActiveTrack("harbor")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTrack === "harbor"
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                    : "text-cyan-400/80 hover:text-cyan-300"
                }`}
              >
                <Anchor className="h-3.5 w-3.5" />
                Opco Harbor (Retail Fractional)
              </button>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white max-w-5xl mx-auto"
            >
              Two Premier Investment Tracks.{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Opco Foundry
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Opco Harbor
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Whether you are a High-Net-Worth Individual, Family Office, or Institution deploying{" "}
              <span className="text-amber-300 font-semibold">$200M+ mega tickets</span> in <span className="text-white font-medium">Opco Foundry</span>, or a retail investor building wealth with fractional real estate in <span className="text-cyan-300 font-semibold">Opco Harbor</span> — Urbco powers trustee-backed real estate opportunities.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/auth/signup?track=foundry">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold px-8 py-6 rounded-2xl shadow-xl shadow-amber-500/20 text-base"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Explore Opco Foundry
                </Button>
              </Link>
              <Link href="/auth/signup?track=harbor">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-cyan-500/40 bg-cyan-950/30 text-cyan-200 hover:bg-cyan-900/40 hover:text-white px-8 py-6 rounded-2xl text-base"
                >
                  <Anchor className="mr-2 h-5 w-5 text-cyan-400" />
                  Join Opco Harbor Retail
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Trustee-Protected Escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Pre & Post-Development Assets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Audited Institutional Reporting</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS BAR ============ */}
        <section className="border-y border-white/10 bg-[#0E0C17] py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left border-r last:border-r-0 border-white/5 pr-4">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4A065] mb-1">
                  <stat.icon className="h-5 w-5" />
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">{stat.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ ECOSYSTEM COMPARISON SECTION ============ */}
        <section id="ecosystems" className="py-24 relative overflow-hidden bg-[#0A0812]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-purple-500/10 text-purple-300 border-purple-500/30 px-4 py-1">
                Architected for Diverse Investor Needs
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Choose Your Preferred Investment Track
              </h2>
              <p className="mt-4 text-slate-400 text-base sm:text-lg">
                Urbco segments high-end real estate opportunities so every investor tier gets maximum returns with structured security.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* ============ OPCO FOUNDRY CARD ============ */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#18130B] via-[#120E08] to-[#0A0805] p-8 sm:p-10 shadow-2xl shadow-amber-950/30 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Crown className="h-4 w-4" />
                    Ultra High-Value Ecosystem
                  </div>
                  <Badge className="bg-amber-400 text-black font-bold">25% — 38%+ ROI</Badge>
                </div>

                <h3 className="text-3xl font-extrabold text-white mb-2">Opco Foundry</h3>
                <p className="text-amber-200/80 text-sm font-medium mb-6">
                  For High-Net-Worth Individuals (HNWIs), Family Offices & Institutional Funds
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Engineered specifically for mega-tickets starting at <span className="text-amber-300 font-bold">₦200M+ ($200M+ USD portfolio scale)</span>. Gain priority access to multi-billion landmark developments, bespoke syndicate structures, and early pre-development land allocations.
                </p>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block">Pre & Post-Development Asset Access</strong>
                      <span className="text-slate-400 text-xs">Participate from early off-plan land acquisition to fully tenanted commercial towers.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block">Dedicated Institutional Trustee Security</strong>
                      <span className="text-slate-400 text-xs">Independent trustee-held escrow with milestone-based fund releases.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block">Tailored Syndicate & Family Office Portal</strong>
                      <span className="text-slate-400 text-xs">Custom governance, multi-signatory approvals, and tax-optimized structures.</span>
                    </div>
                  </div>
                </div>

                <Link href="/auth/signup?track=foundry">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold py-6 rounded-2xl text-base shadow-lg shadow-amber-500/20">
                    Apply for Opco Foundry Access <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              {/* ============ OPCO HARBOR CARD ============ */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0B151A] via-[#081014] to-[#05080A] p-8 sm:p-10 shadow-2xl shadow-cyan-950/30 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    <Anchor className="h-4 w-4" />
                    Retail & Wealth-Building Ecosystem
                  </div>
                  <Badge className="bg-cyan-400 text-black font-bold">16% — 22% ROI</Badge>
                </div>

                <h3 className="text-3xl font-extrabold text-white mb-2">Opco Harbor</h3>
                <p className="text-cyan-200/80 text-sm font-medium mb-6">
                  For Retail Investors, Wealth Builders & Everyday Professionals
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Designed to democratize real estate wealth. Own fractional shares of prime residential and commercial real estate starting from as low as <span className="text-cyan-300 font-bold">₦100,000 / $250</span> with automated quarterly rental dividends.
                </p>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block">Accessible Low-Ticket Fractional Ownership</strong>
                      <span className="text-slate-400 text-xs">Build a diversified real estate portfolio across multiple prime locations.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block">Automated Quarterly Wallet Dividends</strong>
                      <span className="text-slate-400 text-xs">Rental income disbursed directly into your in-app wallet every quarter.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block">Secondary Marketplace Liquidity</strong>
                      <span className="text-slate-400 text-xs">Buy and trade your fractional units whenever you choose.</span>
                    </div>
                  </div>
                </div>

                <Link href="/auth/signup?track=harbor">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold py-6 rounded-2xl text-base shadow-lg shadow-cyan-500/20">
                    Get Started with Opco Harbor <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ PRE-DEV VS POST-DEV ASSET FEATURE ============ */}
        <section className="py-24 bg-[#08060F] border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <Badge className="mb-3 bg-indigo-500/10 text-indigo-300 border-indigo-500/30">
                  Asset Lifecycle Tagging
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Pre-Development vs Post-Development Assets
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                  Filter assets by stage: lock in higher capital appreciation in <span className="text-amber-300">Pre-Development</span> projects or immediate cashflow from <span className="text-emerald-300">Post-Development</span> completed buildings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/marketplace">
                  <Button variant="outline" className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
                    View All Assets <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Asset Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((property) => (
                <Card
                  key={property.id}
                  className="bg-[#110E1B] border-white/10 overflow-hidden hover:border-amber-500/40 transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#110E1B] via-transparent to-black/40" />

                    {/* Stage Badge */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <Badge
                        className={
                          property.developmentStage === "pre-development"
                            ? "bg-purple-600/90 text-white font-semibold"
                            : "bg-emerald-600/90 text-white font-semibold"
                        }
                      >
                        {property.developmentStage === "pre-development" ? "Pre-Development" : "Post-Development"}
                      </Badge>
                      <Badge
                        className={
                          property.targetTrack === "foundry"
                            ? "bg-amber-500 text-black font-bold"
                            : property.targetTrack === "harbor"
                            ? "bg-cyan-500 text-black font-bold"
                            : "bg-slate-200 text-black font-bold"
                        }
                      >
                        {property.targetTrack === "foundry" ? "Foundry" : property.targetTrack === "harbor" ? "Harbor" : "Foundry & Harbor"}
                      </Badge>
                    </div>

                    {/* ROI Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-xs font-bold text-emerald-400">{formatPercentage(property.projectedROI)} ROI</span>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {property.name}
                      </h4>
                      <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {property.location}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
                      <div>
                        <span className="text-slate-500 block">Valuation Scale</span>
                        <strong className="text-slate-200">{formatCompactNumber(property.propertyValue)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Min Entry Ticket</span>
                        <strong className="text-amber-400">{formatCurrency(property.minimumInvestment || property.costPerFraction)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Rental Yield</span>
                        <strong className="text-emerald-400">{formatPercentage(property.rentalYield)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Capital Appreciation</span>
                        <strong className="text-purple-300">+{property.capitalAppreciation}%</strong>
                      </div>
                    </div>

                    <Link href={`/assets/${property.id}`} className="block pt-2">
                      <Button variant="outline" size="sm" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10">
                        View Details & Allocate
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DYNAMIC ROI CALCULATOR ============ */}
        <section className="py-24 bg-[#0A0713] border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/30">
                  <Calculator className="mr-1.5 h-3.5 w-3.5" />
                  Yield Simulator
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  Calculate Your Projected Returns
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  Test your potential earnings across fixed investment terms for both <span className="text-amber-300 font-semibold">Opco Foundry</span> and <span className="text-cyan-300 font-semibold">Opco Harbor</span>.
                </p>

                {/* Track Switch for Calculator */}
                <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => {
                      setCalculatorTrack("foundry");
                      setInvestmentAmount(100000000);
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      calculatorTrack === "foundry"
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Crown className="h-4 w-4" />
                    Opco Foundry (28% Avg Yield)
                  </button>
                  <button
                    onClick={() => {
                      setCalculatorTrack("harbor");
                      setInvestmentAmount(5000000);
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      calculatorTrack === "harbor"
                        ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Anchor className="h-4 w-4" />
                    Opco Harbor (18% Avg Yield)
                  </button>
                </div>
              </div>

              {/* Calculator Box */}
              <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#120E1F] p-8 shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-slate-300 font-medium">Select Capital Allocation</label>
                      <span className="text-xl font-bold text-amber-400">{formatCurrency(investmentAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min={calculatorTrack === "foundry" ? 10000000 : 100000}
                      max={calculatorTrack === "foundry" ? 500000000 : 50000000}
                      step={calculatorTrack === "foundry" ? 10000000 : 500000}
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 rounded-lg bg-white/10"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 pt-4">
                    {yearScenarios.map((scenario) => (
                      <div key={scenario.years} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                        <div className="text-xs text-slate-400 font-medium">{scenario.years} Year Term</div>
                        <div className="text-xl font-extrabold text-white mt-1">{formatCompactNumber(scenario.total)}</div>
                        <div className="text-xs text-emerald-400 font-bold mt-1">
                          +{formatCompactNumber(scenario.returns)} Net Gain
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span>* Projections based on historical performance & verified lease yields.</span>
                    <Link href="/auth/signup">
                      <Button size="sm" variant="premium" className="rounded-xl">
                        Deploy Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TAILORED ENTITY TYPES SECTION ============ */}
        <section className="py-24 bg-[#07050A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
                Institutional-Grade Governance
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Built For Every Entity Type
              </h2>
              <p className="mt-4 text-slate-400 text-base">
                Tailored onboarding, document verification, and portfolio management workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-3xl border border-white/10 bg-[#0E0C17] p-8 hover:border-amber-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">High-Net-Worth Individuals</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Deploy large individual capital tickets in Opco Foundry or build passive income streams in Opco Harbor. Direct tax-efficient reporting and dedicated advisor support.
                </p>
                <div className="text-xs text-amber-400 font-semibold">Individual KYC Flow Included →</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0E0C17] p-8 hover:border-purple-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Family Offices</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Multi-generational capital preservation. Multi-signatory approvals, custom AUM verification, trustee oversight, and multi-asset syndicate allocation.
                </p>
                <div className="text-xs text-purple-400 font-semibold">Family Office KYC Flow Included →</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0E0C17] p-8 hover:border-cyan-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Institutions & Corporates</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Corporate treasury allocation, fund management, board resolutions, LEI / TIN compliance, and automated API-driven dividend settlements.
                </p>
                <div className="text-xs text-cyan-400 font-semibold">Institutional KYC Flow Included →</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOOTER CTA ============ */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0E0B18] to-black border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Ready to Allocate Your Capital?
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
              Select your track — Opco Foundry for high-value mega assets or Opco Harbor for retail fractional entry.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" variant="premium" className="px-8 py-6 rounded-2xl text-base font-bold shadow-xl">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer copyright */}
      <footer className="py-8 bg-black border-t border-white/10 text-center text-xs text-slate-500">
        <p>© 2026 Urbco Investors App. Opco Foundry & Opco Harbor are registered investment ecosystems.</p>
      </footer>
    </div>
  );
}