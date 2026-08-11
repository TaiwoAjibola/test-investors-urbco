"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Shield, TrendingUp, Award, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const values = [
  { icon: Shield, title: "Trust & Transparency", desc: "Every investment is legally structured with full disclosure of terms, risks, and performance." },
  { icon: TrendingUp, title: "Excellence", desc: "We source only the best properties and manage them to the highest standards." },
  { icon: Users, title: "Investor First", desc: "Your financial goals drive every decision we make." },
  { icon: Award, title: "Innovation", desc: "Using technology to make real estate investment accessible to all Nigerians." },
];

const team = [
  { name: "Coming Soon", role: "Our team of experienced professionals is building the future of real estate investment in Nigeria." },
];

export default function AboutPage() {
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
            <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Services</Link>
            <Link href="/about" className="text-sm font-medium text-emerald-600 transition-colors">About Us</Link>
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
              About <span className="gradient-text">Urbco</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize real estate investment in Nigeria, making premium property accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    To democratize real estate investment by breaking down traditional barriers — high capital requirements, 
                    complex processes, and opaque markets — so every Nigerian can build wealth through prime property ownership.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    To become Nigeria's most trusted real estate investment platform, empowering millions to achieve 
                    financial freedom through accessible, transparent, and profitable property investments.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-xl text-slate-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "₦12.5B+", label: "Total Funded" },
              { value: "5,000+", label: "Active Investors" },
              { value: "45+", label: "Properties" },
              { value: "22.5%", label: "Avg. Annual ROI" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-slate-600">We'd love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600 text-sm">support@urbcoinvest.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
                <p className="text-slate-600 text-sm">Lagos, Nigeria</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                <p className="text-slate-600 text-sm">+234 800 URB CO 00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Your Investment Journey</h2>
          <p className="text-xl text-emerald-100 mb-10">
            Join thousands of smart investors building wealth through real estate
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
              Create Free Account
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
