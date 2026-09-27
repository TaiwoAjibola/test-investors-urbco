"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Crown, Anchor, Building2, Briefcase, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTrack = searchParams?.get("track") === "foundry" ? "foundry" : "harbor";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "NG",
    investmentExperience: "intermediate",
    riskAppetite: "medium",
    investorTrack: initialTrack as "foundry" | "harbor",
    entityType: "individual" as "individual" | "family-office" | "institution",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API registration call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/auth/otp-verify");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 sm:px-6 py-12 text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <img src="/urbco-logo-white.svg" alt="Urbco" className="h-10" />
        </Link>

        <Card className="border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-slate-100">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-display text-3xl font-extrabold text-white">Create Your Account</CardTitle>
            <CardDescription className="text-slate-400">
              Select your investment track and entity type to start allocating capital
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: INVESTMENT TRACK SELECTION */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-200">1. Select Your Investment Track</Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Opco Foundry Card */}
                  <div
                    onClick={() => setFormData({ ...formData, investorTrack: "foundry" })}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      formData.investorTrack === "foundry"
                        ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/50"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <Crown className="h-4 w-4" />
                        Opco Foundry
                      </div>
                      {formData.investorTrack === "foundry" && (
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-semibold mb-1">For HNWIs, Family Offices & Institutions</p>
                    <p className="text-xs text-slate-400">High-value mega assets (&gt; $200M scale), pre/post development, high yield ROI.</p>
                  </div>

                  {/* Opco Harbor Card */}
                  <div
                    onClick={() => setFormData({ ...formData, investorTrack: "harbor" })}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      formData.investorTrack === "harbor"
                        ? "border-cyan-400 bg-cyan-500/10 ring-2 ring-cyan-500/50"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                        <Anchor className="h-4 w-4" />
                        Opco Harbor
                      </div>
                      {formData.investorTrack === "harbor" && (
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 font-semibold mb-1">For Retail & Everyday Wealth Builders</p>
                    <p className="text-xs text-slate-400">Accessible fractional shares (from ₦100k), steady quarterly wallet dividends.</p>
                  </div>
                </div>
              </div>

              {/* STEP 2: ENTITY TYPE SELECTION */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-200">2. Select Your Entity Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, entityType: "individual" })}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                      formData.entityType === "individual"
                        ? "border-emerald-500 bg-emerald-500/10 text-white font-semibold"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Users className="h-5 w-5 mx-auto mb-1 text-emerald-400" />
                    <span className="text-xs block">Individual</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, entityType: "family-office" })}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                      formData.entityType === "family-office"
                        ? "border-purple-500 bg-purple-500/10 text-white font-semibold"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Briefcase className="h-5 w-5 mx-auto mb-1 text-purple-400" />
                    <span className="text-xs block">Family Office</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, entityType: "institution" })}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                      formData.entityType === "institution"
                        ? "border-cyan-500 bg-cyan-500/10 text-white font-semibold"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Building2 className="h-5 w-5 mx-auto mb-1 text-cyan-400" />
                    <span className="text-xs block">Institution</span>
                  </div>
                </div>
              </div>

              {/* STEP 3: PERSONAL / CONTACT DETAILS */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-300">Full Name / Entity Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="fullName"
                      placeholder="e.g. John Doe / Apex Capital LLC"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Official Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 801 234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-300">Country of Incorporation / Residence</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                      <SelectItem value="NG">Nigeria</SelectItem>
                      <SelectItem value="GH">Ghana</SelectItem>
                      <SelectItem value="KE">Kenya</SelectItem>
                      <SelectItem value="ZA">South Africa</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="AE">United Arab Emirates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 bg-white/5 border-white/10 text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 rounded border-slate-700 bg-white/5 text-amber-500 focus:ring-amber-500" required />
                <span className="text-xs text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-amber-400 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link>
                </span>
              </div>

              <Button
                type="submit"
                className={`w-full py-6 text-base font-bold rounded-2xl shadow-xl transition-all ${
                  formData.investorTrack === "foundry"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black shadow-amber-500/20"
                    : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black shadow-cyan-500/20"
                }`}
                isLoading={isLoading}
              >
                Create Account for {formData.investorTrack === "foundry" ? "Opco Foundry" : "Opco Harbor"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-amber-400 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
