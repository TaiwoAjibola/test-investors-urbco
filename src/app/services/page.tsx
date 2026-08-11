"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Shield, Home, ClipboardCheck, BarChart3, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const services = [
  {
    icon: Building2,
    title: "Fractional Real Estate Investment",
    description: "Own high-value properties with as little as ₦500,000. We handle the acquisition, management, and administration while you earn passive income through rental yields and capital appreciation.",
  },
  {
    icon: ClipboardCheck,
    title: "Property Sourcing & Due Diligence",
    description: "Our team identifies and vets premium real estate opportunities across Nigeria, conducting thorough due diligence on legal titles, construction quality, location analysis, and growth potential.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Management",
    description: "We manage your real estate investments end-to-end, including tenant sourcing, rent collection, maintenance, and regular performance reporting through your personalized dashboard.",
  },
  {
    icon: Handshake,
    title: "Property Management",
    description: "Our professional property management team handles day-to-day operations, tenant relations, maintenance, and optimizes rental income to maximize your returns.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Get personalized advice on building a diversified real estate portfolio that aligns with your financial goals, risk appetite, and investment timeline.",
  },
  {
    icon: Shield,
    title: "Legal & Regulatory Compliance",
    description: "All investments are structured with proper legal documentation, title insurance, and regulatory compliance to protect your capital and ensure transparent transactions.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/urbco-logo.svg" alt="Urbco" className="h-9" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/marketplace" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Own-a-Fraction</Link>
            <Link href="/services" className="text-sm font-medium text-emerald-600 transition-colors">Services</Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">About Us</Link>
            <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Login</Link>
            <Link href="/auth/signup">
              <Button variant="premium" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-[1.05] tracking-tight">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive real estate investment services designed to help you build wealth through premium Nigerian property.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-emerald-100 mb-10">
            Join thousands of smart investors building wealth through real estate
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img src="/urbco-logo.svg" alt="Urbco" className="h-10 brightness-0 invert" />
              </div>
              <p className="text-slate-400 text-sm">
                Nigeria's leading real estate fractional investment platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/marketplace" className="hover:text-white">Own-a-Fraction</Link></li>
                <li><Link href="/services" className="hover:text-white">Services</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/about#careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/about#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            © 2024 Urbco. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
