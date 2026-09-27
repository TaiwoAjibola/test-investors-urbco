"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Crown, Anchor, Building2, Briefcase, Users, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const TRACKS = [
  {
    key: "foundry" as const,
    name: "Institutional",
    icon: Crown,
    blurb: "For family offices, HNWIs and institutions",
    detail: "Allocations from ₦200M into completed and near-completion assets.",
    accent: "border-accent-400 bg-accent-50",
    iconClass: "bg-accent-100 text-accent-700",
    dot: "bg-accent-600",
  },
  {
    key: "harbor" as const,
    name: "Fractional",
    icon: Anchor,
    blurb: "For individuals building wealth steadily",
    detail: "Entry from ₦100K with quarterly wallet dividends.",
    accent: "border-brand-400 bg-brand-50",
    iconClass: "bg-brand-100 text-brand-700",
    dot: "bg-brand-600",
  },
];

const ENTITY_TYPES = [
  { key: "individual" as const, label: "Individual", icon: Users, on: "border-brand-500 bg-brand-50 text-brand-800", off: "border-line bg-white text-slate-600 hover:border-brand-200" },
  { key: "family-office" as const, label: "Family office", icon: Briefcase, on: "border-brand-500 bg-brand-50 text-brand-800", off: "border-line bg-white text-slate-600 hover:border-brand-200" },
  { key: "institution" as const, label: "Institution", icon: Building2, on: "border-brand-500 bg-brand-50 text-brand-800", off: "border-line bg-white text-slate-600 hover:border-brand-200" },
];

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-sunken" />}>
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
    investorTrack: initialTrack as "foundry" | "harbor",
    entityType: "individual" as "individual" | "family-office" | "institution",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const passwordsMatch = formData.confirmPassword.length === 0 || formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !passwordsMatch) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    router.push("/auth/otp-verify");
  };

  return (
    <div className="min-h-screen bg-surface-sunken px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="mb-8 flex justify-center">
          <img src="/urbco-logo.svg" alt="Urbco" className="h-9 w-auto" />
        </Link>

        <Card className="border-line shadow-card">
          <CardHeader className="px-6 pb-2 text-center sm:px-8">
            <CardTitle className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">Create your account</CardTitle>
            <CardDescription className="mt-1 text-slate-600">
              Tell us how you plan to invest so we can set up the right onboarding.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pt-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 1 — Track */}
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-slate-900">
                  <span className="text-brand-600">1.</span> Choose your investment track
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TRACKS.map((t) => {
                    const selected = formData.investorTrack === t.key;
                    return (
                      <button
                        type="button"
                        key={t.key}
                        onClick={() => setFormData({ ...formData, investorTrack: t.key })}
                        aria-pressed={selected}
                        className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                          selected ? t.accent : "border-line bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${t.iconClass}`}>
                            <t.icon className="h-4 w-4" />
                          </span>
                          {selected && <Check className="h-4 w-4 text-brand-700" />}
                        </div>
                        <div className="mt-3 text-sm font-bold text-slate-900">{t.name}</div>
                        <div className="mt-0.5 text-xs font-medium text-slate-600">{t.blurb}</div>
                        <div className="mt-1.5 text-xs text-slate-500">{t.detail}</div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 2 — Entity type */}
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-slate-900">
                  <span className="text-brand-600">2.</span> How will you invest?
                </legend>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {ENTITY_TYPES.map((e) => {
                    const selected = formData.entityType === e.key;
                    return (
                      <button
                        type="button"
                        key={e.key}
                        onClick={() => setFormData({ ...formData, entityType: e.key })}
                        aria-pressed={selected}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                          selected ? e.on : e.off
                        }`}
                      >
                        <e.icon className="h-4 w-4 shrink-0" />
                        {e.label}
                      </button>
                    );
                  })}
                </div>
                {formData.entityType === "institution" && (
                  <p className="mt-3 flex items-start gap-2 rounded-lg border border-brand-200 bg-brand-50 p-3 text-xs text-brand-800">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                    After email verification you will be routed to institutional onboarding for CAC, UBO and
                    sanctions/PEP screening.
                  </p>
                )}
              </fieldset>

              {/* 3 — Details */}
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-slate-900">
                  <span className="text-brand-600">3.</span> Your details
                </legend>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-slate-700">Full name</Label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input id="fullName" placeholder="e.g. Ada Okonkwo" value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="pl-9" required autoComplete="name" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-slate-700">Email address</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input id="email" type="email" placeholder="you@example.com" value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-9" required autoComplete="email" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-slate-700">Phone number</Label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input id="phone" type="tel" placeholder="+234 801 234 5678" value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-9" required autoComplete="tel" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="country" className="text-slate-700">Country</Label>
                      <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                        <SelectTrigger id="country" className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
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

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="text-slate-700">Password</Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-9 pr-10" required autoComplete="new-password" minLength={8} />
                        <button type="button" onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-700"
                          aria-label={showPassword ? "Hide password" : "Show password"}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword" className="text-slate-700">Confirm password</Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`pl-9 ${!passwordsMatch ? "border-red-400 focus-visible:ring-red-500" : ""}`}
                          required autoComplete="new-password" />
                      </div>
                      {!passwordsMatch && <p className="text-xs text-red-600">Passwords do not match.</p>}
                    </div>
                  </div>
                </div>
              </fieldset>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-500"
                />
                <span className="text-xs leading-relaxed text-slate-600">
                  I agree to the <span className="font-semibold text-brand-700">Terms of Service</span> and{" "}
                  <span className="font-semibold text-brand-700">Privacy Policy</span>, and I consent to identity
                  verification against submitted documents.
                </span>
              </label>

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                disabled={!agreed || !passwordsMatch}
                className="w-full shadow-lg shadow-brand-600/20"
              >
                Create account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-brand-700 transition-colors hover:text-brand-800">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
