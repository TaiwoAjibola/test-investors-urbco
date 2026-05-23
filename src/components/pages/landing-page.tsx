"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Shield, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { properties } from "@/data/mockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LandingPage() {
  const [investmentAmount, setInvestmentAmount] = useState(1000000);

  const stats = [
    { label: "Total Funded", value: "₦12.5B+" },
    { label: "Active Investors", value: "5,000+" },
    { label: "Average ROI", value: "22.5%" },
    { label: "Properties", value: "45+" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Investments",
      description: "Your investments are protected with institutional-grade security and regulatory compliance.",
    },
    {
      icon: TrendingUp,
      title: "High Returns",
      description: "Earn up to 22% annual returns through rental income and capital appreciation.",
    },
    {
      icon: Building2,
      title: "Premium Properties",
      description: "Access carefully vetted, high-quality real estate across Nigeria's prime locations.",
    },
    {
      icon: Users,
      title: "Expert Management",
      description: "Our team handles property management, tenant relations, and maintenance.",
    },
  ];

  const calculateReturns = (amount: number, years: number) => {
    const annualYield = 0.22;
    const totalReturn = amount * Math.pow(1 + annualYield, years);
    return totalReturn - amount;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/urbco-logo.svg" alt="Urbco" className="h-10" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-slate-600 hover:text-emerald-600 transition-colors">Own-a-Fraction</Link>
            <Link href="/services" className="text-slate-600 hover:text-emerald-600 transition-colors">Services</Link>
            <Link href="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">About Us</Link>
            <Link href="/auth/login" className="text-slate-600 hover:text-emerald-600 transition-colors">Login</Link>
            <Link href="/auth/signup">
              <Button variant="premium">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="premium" className="mb-6 text-sm px-4 py-2">
              🎉 Nigeria's #1 Real Estate Investment Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Own Fractional Shares of
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> Premium Real Estate</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
              Invest in Nigeria's most lucrative properties with as little as ₦500,000. 
              Earn passive income through rental yields and capital appreciation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/auth/signup">
                <Button variant="premium" size="lg" className="w-full sm:w-auto">
                  Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Properties
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Investment Opportunities</h2>
            <p className="text-xl text-slate-600">Carefully selected properties with high returns</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(p => p.featured).slice(0, 3).map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={property.status === "open" ? "success" : "warning"}>
                        {property.status === "open" ? "Open for Investment" : "Funding"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-emerald-600">{formatPercentage(property.projectedROI)} ROI</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{property.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">{property.location}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Funding Progress</span>
                        <span className="font-medium text-slate-900">{formatPercentage(property.fundingProgress)}</span>
                      </div>
                      <Progress value={property.fundingProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Min. Investment</span>
                        <p className="font-semibold text-slate-900">{formatCurrency(property.costPerFraction)}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Rental Yield</span>
                        <p className="font-semibold text-emerald-600">{formatPercentage(property.rentalYield)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/marketplace">
              <Button variant="outline" size="lg">
                View All Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How Urbco Works</h2>
            <p className="text-xl text-slate-600">Start earning passive income in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Create Account", desc: "Sign up and complete your KYC verification" },
              { step: "02", title: "Browse Properties", desc: "Explore vetted investment opportunities" },
              { step: "03", title: "Make Investment", desc: "Choose fractions and payment plan" },
              { step: "04", title: "Earn Returns", desc: "Receive quarterly dividends & appreciation" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Invest With Urbco</h2>
            <p className="text-xl text-slate-600">The smart way to build wealth through real estate</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Calculate Your Returns</h2>
            <p className="text-xl text-emerald-100">See how much you could earn with Urbco</p>
          </div>

          <Card className="p-8">
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Investment Amount (₦)
              </label>
              <Input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 3, 5].map((years) => {
                const returns = calculateReturns(investmentAmount, years);
                const total = investmentAmount + returns;
                return (
                  <div key={years} className="text-center p-6 rounded-xl bg-slate-50">
                    <div className="text-sm text-slate-500 mb-2">{years} Year{years > 1 ? "s" : ""}</div>
                    <div className="text-2xl font-bold text-emerald-600 mb-1">{formatCurrency(returns)}</div>
                    <div className="text-xs text-slate-500">Total: {formatCurrency(total)}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Investors Say</h2>
            <p className="text-xl text-slate-600">Join thousands of satisfied investors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Chinedu Okafor",
                role: "Business Owner",
                quote: "Urbco has transformed how I invest in real estate. The returns are consistent and the platform is incredibly easy to use.",
              },
              {
                name: "Fatima Abdullahi",
                role: "Doctor",
                quote: "As a busy professional, I appreciate how Urbco handles everything. I earn passive income without any hassle.",
              },
              {
                name: "Tunde Bakare",
                role: "Tech Entrepreneur",
                quote: "The transparency and professionalism of Urbco is unmatched. I've recommended it to all my friends.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Join over 5,000 investors earning passive income through premium real estate
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button variant="premium" size="lg">
                Create Free Account
              </Button>
            </Link>
            <a href="tel:+234800URBCO00">
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-5 w-5" /> Talk to an Advisor
              </Button>
            </a>
          </div>
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
