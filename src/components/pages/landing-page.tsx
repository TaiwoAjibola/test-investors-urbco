"use client";

import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  MapPin,
  Award,
  LineChart,
  Wallet,
  Rocket,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { properties } from "@/data/mockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [investmentAmount, setInvestmentAmount] = useState(1000000);
  const heroProperty = properties[0];

  const stats = [
    { label: "Total Property Funded", value: "₦12.5B+", icon: Wallet },
    { label: "Active Investors", value: "5,000+", icon: Users },
    { label: "Average Annual ROI", value: "22.5%", icon: LineChart },
  ];

  const howItWorks = [
    { step: "01", title: "Invest with confidence", desc: "You send funds to independent trustees — not straight to the developer." },
    { step: "02", title: "Funds stay protected", desc: "Trustees hold your capital securely until project milestones are met." },
    { step: "03", title: "Milestone-based release", desc: "Only when the developer hits agreed milestones do trustees release funds." },
    { step: "04", title: "Earn as the project grows", desc: "Track progress transparently and collect returns as value is delivered." },
  ];

  const testimonials = [
    {
      name: "Chinedu Okafor",
      role: "Business Owner, Lagos",
      quote: "Urbco made buying into Lekki real estate effortless. My first dividend arrived right on schedule.",
      initials: "CO",
    },
    {
      name: "Fatima Abdullahi",
      role: "Doctor, Abuja",
      quote: "I finally own property without the headaches of management. The dashboard is beautiful and clear.",
      initials: "FA",
    },
    {
      name: "Tunde Bakare",
      role: "Tech Entrepreneur",
      quote: "Transparency is everything. I can track funding progress and my exact ROI in real time.",
      initials: "TB",
    },
  ];

  const calculateReturns = (amount: number, years: number) => {
    const annualYield = 0.22;
    return Math.round(amount * Math.pow(1 + annualYield, years) - amount);
  };

  const yearScenarios = [1, 3, 5].map((years) => {
    const returns = calculateReturns(investmentAmount, years);
    return { years, returns, total: investmentAmount + returns };
  });

  const investors = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#0B0710]">
      {/* ============ NAV ============ */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 pt-4">
          <div className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-[#12101a]/80 px-5 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-xl">
            <Link href="/" className="flex items-center">
              <img src="/urbco-logo.svg" alt="Urbco" className="h-8 brightness-0 invert" />
            </Link>
            <nav className="hidden items-center gap-8 lg:flex">
              <Link href="/marketplace" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">Own-a-Fraction</Link>
              <Link href="/services" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">Services</Link>
              <Link href="/about" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">About Us</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:block">Login</Link>
              <Link href="/auth/signup">
                <Button variant="premium" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden pt-36 pb-24">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#870F73]/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-[#D4A065]/10 blur-[100px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
            {/* Left copy */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Badge className="mb-6 border border-[#D4A065]/30 bg-[#D4A065]/10 px-4 py-1.5 text-[#D4A065]">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Nigeria&apos;s #1 Fractional Real Estate Platform
              </Badge>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-[4.25rem]">
                Own real estate.
                <br />
                <span className="gradient-text">Start from ₦500K.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                Your capital goes to independent{" "}
                <span className="font-semibold text-white">trustees</span>, not straight to developers.
                Funds are released only when milestones are met — so your money stays safe and secure.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/auth/signup">
                  <Button variant="premium" size="lg" className="w-full group sm:w-auto">
                    Start Investing Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" size="lg" className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto">
                    Explore Portfolio
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {investors.map((src, i) => (
                    <img key={i} src={src} alt="Investor" className="h-10 w-10 rounded-full border-2 border-[#0B0710]" />
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0B0710] bg-[#870F73] text-xs font-semibold text-white">5k</div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4A065] text-[#D4A065]" />
                    ))}
                    <span className="ml-1 text-sm font-semibold text-white">4.9</span>
                  </div>
                  <p className="text-sm text-slate-400">Trusted by 5,000+ investors</p>
                </div>
              </div>
            </motion.div>

            {/* Right visual composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_60px_rgb(0_0_0/0.5)]">
                <img
                  src={heroProperty.images[0]}
                  alt={heroProperty.name}
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0710]/80 via-transparent to-transparent" />
                {/* Live funding overlay */}
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-white/90 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold text-slate-900">{heroProperty.name}</p>
                      <p className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5" /> {heroProperty.location}
                      </p>
                    </div>
                    <Badge className="bg-[#D4A065]/15 text-[#8a5a13]">
                      {formatPercentage(heroProperty.projectedROI)} ROI
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Funded</span>
                      <span className="font-semibold text-slate-900">{formatPercentage(heroProperty.fundingProgress)}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${heroProperty.fundingProgress}%` }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#870F73] to-[#D4A065]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating ROI card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -left-6 top-10 hidden rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#870F73]">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Annual Yield</p>
                    <p className="font-display text-lg font-bold text-[#D4A065]">+{formatPercentage(heroProperty.rentalYield)}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating value card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -right-4 bottom-40 hidden rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4A065]/20">
                    <Building2 className="h-5 w-5 text-[#D4A065]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Property Value</p>
                    <p className="font-display text-lg font-bold text-white">{formatCurrency(heroProperty.propertyValue)}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============ STATS BAND ============ */}
        <section className="relative border-y border-white/10 bg-gradient-to-r from-[#870F73]/20 via-transparent to-[#D4A065]/10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 py-8 sm:justify-center sm:py-10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#D4A065]">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ FEATURED PROPERTIES ============ */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <Badge className="mb-4 border-[#870F73]/30 bg-[#870F73]/15 text-[#d78cc4]">
                  <Building2 className="mr-1.5 h-3.5 w-3.5" /> Live Opportunities
                </Badge>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Assets earning <span className="gradient-text">right now</span>
                </h2>
              </div>
              <Link href="/marketplace" className="group flex items-center gap-1 text-sm font-medium text-[#D4A065] transition-colors hover:text-[#e8bd8a]">
                View all properties <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {properties.filter((p) => p.featured).slice(0, 3).map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/assets/${property.id}`} className="group block">
                    <Card className="overflow-hidden border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#870F73]/50 hover:bg-white/10">
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute right-4 top-4 bg-[#D4A065] text-[#3a2a08]">
                          {formatPercentage(property.projectedROI)} ROI
                        </Badge>
                        <div className="absolute inset-x-4 bottom-4">
                          <p className="font-display text-lg font-semibold text-white">{property.name}</p>
                          <p className="flex items-center gap-1 text-sm text-slate-300">
                            <MapPin className="h-3.5 w-3.5" /> {property.location}
                          </p>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="text-slate-400">Funding progress</span>
                          <span className="font-semibold text-[#D4A065]">{formatPercentage(property.fundingProgress)}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#870F73] to-[#D4A065]" style={{ width: `${property.fundingProgress}%` }} />
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-400">Fraction from</p>
                            <p className="font-display text-lg font-bold text-white">{formatCurrency(property.costPerFraction)}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium text-[#D4A065]">
                            Invest <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="relative border-y border-white/10 bg-white/[0.02] py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-[#870F73]/30 bg-[#870F73]/15 text-[#d78cc4]">
                <Rocket className="mr-1.5 h-3.5 w-3.5" /> How It Works
              </Badge>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                How trustees keep your funds <span className="gradient-text">safe</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-[#870F73]/40"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-display text-4xl font-bold text-white/15">{item.step}</span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#870F73] to-[#D4A065]">
                      {i === 3 ? <CheckCircle2 className="h-4 w-4 text-white" /> : <ChevronRight className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <h3 className="font-display mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES / BENTO ============ */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid items-end gap-8 lg:grid-cols-2">
              <div>
                <Badge className="mb-4 border-[#870F73]/30 bg-[#870F73]/15 text-[#d78cc4]">
                  <Shield className="mr-1.5 h-3.5 w-3.5" /> Why Urbco
                </Badge>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                  A real layer of trust<br />between you and the <span className="gradient-text">developer.</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-400 lg:max-w-md lg:justify-self-end">
                Before Urbco, investors sent money straight to developers with no protection. Now trustees hold the funds and release them only when milestones are reached.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#870F73]/30 to-white/5 p-8 lg:col-span-2 lg:row-span-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#870F73]">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display mt-6 text-2xl font-bold text-white">Trustee-secured capital</h3>
                <p className="mt-3 mb-8 max-w-md leading-relaxed text-slate-400">
                  Investors fund trustees. Trustees release money to developers only at verified milestones. Your capital is protected every step of the way.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Funds held by", value: "Trustees" },
                    { label: "Released on", value: "Milestones" },
                    { label: "Investor protection", value: "Built-in" },
                    { label: "Developer access", value: "Earned" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="font-display mt-1 text-lg font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {[
                { icon: Shield, title: "Funds never go direct", desc: "Unlike before, you don’t wire money straight to developers. Trustees sit in the middle." },
                { icon: Users, title: "Milestone releases only", desc: "Developers get capital when they deliver — not upfront on trust alone." },
                { icon: Award, title: "Safe & secure by design", desc: "Opco exists to prove to investors that their funds are protected until value is delivered." },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-[#870F73]/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A065]/20">
                    <feature.icon className="h-6 w-6 text-[#D4A065]" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ROI CALCULATOR ============ */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#870F73]/25 via-[#0B0710] to-[#D4A065]/15 p-8 md:p-14">
              <div className="mb-10 text-center">
                <Badge className="mb-4 border-[#D4A065]/30 bg-[#D4A065]/10 text-[#D4A065]">
                  <LineChart className="mr-1.5 h-3.5 w-3.5" /> ROI Calculator
                </Badge>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                  See what your money could become
                </h2>
                <p className="mt-3 text-slate-400">Drag the amount and watch your projected returns grow.</p>
              </div>

              <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                  <label className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Investment amount</span>
                    <span className="font-display text-xl font-bold text-white">{formatCurrency(investmentAmount)}</span>
                  </label>
                  <input
                    type="range"
                    min={500000}
                    max={50000000}
                    step={500000}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full accent-[#D4A065]"
                  />
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>₦500K</span>
                    <span>₦50M</span>
                  </div>

                  <div className="mt-8 space-y-3">
                    {yearScenarios.map((s) => (
                      <div key={s.years} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#870F73]/40 text-sm font-bold text-white">
                            {s.years}
                          </div>
                          <span className="text-sm text-slate-300">{s.years} {s.years === 1 ? "year" : "years"}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg font-bold text-[#D4A065]">+{formatCurrency(s.returns)}</p>
                          <p className="text-xs text-slate-500">Total {formatCurrency(s.total)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-72 md:w-72">
                  <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="88"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={Math.PI * 2 * 88}
                      animate={{ strokeDashoffset: Math.PI * 2 * 88 * (1 - 0.05 + (investmentAmount / 50000000) * 0.87) }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#870F73" />
                        <stop offset="100%" stopColor="#D4A065" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-white">
                      +{formatCurrency(calculateReturns(investmentAmount, 5))}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">projected in 5 years<br />at 22% p.a.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="border-t border-white/10 bg-white/[0.02] py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <Badge className="mb-4 border-[#870F73]/30 bg-[#870F73]/15 text-[#d78cc4]">
                <Users className="mr-1.5 h-3.5 w-3.5" /> Investor Stories
              </Badge>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                Real people. <span className="gradient-text">Real returns.</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-white/10 bg-white/5 p-7 transition-colors hover:border-[#870F73]/40">
                    <div className="mb-4 flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-[#D4A065] text-[#D4A065]" />
                      ))}
                    </div>
                    <p className="mb-6 text-slate-300">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#870F73] to-[#D4A065] text-sm font-bold text-white">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="px-6 py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#870F73] to-[#5a0a4c] p-12 text-center md:p-20">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-white/10 blur-[80px]" />
            <h2 className="font-display relative text-4xl font-bold tracking-tight text-white md:text-6xl">
              Your funds stay safe<br />until milestones are met.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/80">
              Invest through trustees. We release capital to developers only when they deliver — so your money is never left unprotected.
            </p>
            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full bg-white text-[#870F73] hover:bg-white/90 sm:w-auto">
                  Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+234800URBCO00">
                <Button size="lg" variant="outline" className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" /> Talk to an Advisor
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <img src="/urbco-logo.svg" alt="Urbco" className="mb-4 h-8 brightness-0 invert" />
              <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                Trustee-secured real estate investing. Your capital is held safely and released to developers only at verified milestones.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/marketplace" className="transition-colors hover:text-white">Own-a-Fraction</Link></li>
                <li><Link href="/services" className="transition-colors hover:text-white">Services</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/about" className="transition-colors hover:text-white">About Us</Link></li>
                <li><Link href="/about#careers" className="transition-colors hover:text-white">Careers</Link></li>
                <li><Link href="/about#contact" className="transition-colors hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="transition-colors hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
            <p>© 2024 Urbco. All rights reserved.</p>
            <p>Lagos &middot; Nigeria</p>
          </div>
        </div>
      </footer>
    </div>
  );
}