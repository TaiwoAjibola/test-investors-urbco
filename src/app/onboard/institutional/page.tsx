"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, CheckCircle, FileText, Upload, User, ShieldCheck, ArrowRight,
  ArrowLeft, Landmark, Users, Target, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/stores/appStore";
import { InstitutionalProfile, Address, AuthorisedRep, InvestmentProfile } from "@/types";
import Link from "next/link";

const STEPS = [
  { id: 1, title: "Company Info", icon: Building2 },
  { id: 2, title: "Classification", icon: Landmark },
  { id: 3, title: "Authorised Rep", icon: User },
  { id: 4, title: "Investment Profile", icon: Target },
  { id: 5, title: "Documents", icon: FileText },
  { id: 6, title: "Review & Submit", icon: ShieldCheck },
];

const emptyAddress: Address = { address: "", city: "", state: "", country: "Nigeria" };

const emptyForm = {
  companyName: "",
  tradingName: "",
  cacNumber: "",
  companyType: "Ltd" as const,
  incorporationDate: "",
  industry: "",
  natureOfBusiness: "",
  countryOfRegistration: "Nigeria",
  registeredAddress: { ...emptyAddress },
  operatingAddress: { ...emptyAddress },
  officialEmail: "",
  officialPhone: "",
  website: "",
  institutionType: "asset-manager" as InstitutionalProfile["institutionType"],
  ownershipType: "private" as InstitutionalProfile["ownershipType"],
  authorisedRep: { fullName: "", position: "", department: "", email: "", phone: "" } as AuthorisedRep,
  investmentProfile: {
    investmentObjective: "",
    preferredSectors: [] as string[],
    preferredProjectTypes: [] as string[],
    geographicPreference: [] as string[],
    minimumInvestment: 0,
    maximumInvestment: 0,
    typicalTicketSize: 0,
    investmentHorizon: "",
    preferredStructure: [] as InvestmentProfile["preferredStructure"],
    preferredCurrency: "NGN",
  } as InvestmentProfile,
};

const SECTORS = ["Real Estate", "Infrastructure", "Hospitality", "Commercial", "Residential", "Mixed-Use", "Logistics"];
const PROJECT_TYPES = ["Development", "Completed", "Income-Producing", "Land", "Mega-Asset"];
const GEO = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Rest of Nigeria", "Pan-Africa"];
const STRUCTURES = ["equity", "debt", "revenue-share", "jv"] as const;

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function InstitutionalOnboardingPage() {
  const { saveInstitutionalProfile, setKycStatus } = useAppStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [statusStage, setStatusStage] = useState<"submitted" | "cac" | "ubo" | "screening" | "verified" | "failed">("submitted");

  const set = (patch: Partial<typeof form>) => setForm({ ...form, ...patch });

  const canProceed = () => {
    if (step === 1) return form.companyName && form.cacNumber && form.officialEmail && form.registeredAddress.address;
    if (step === 3) return form.authorisedRep.fullName && form.authorisedRep.email;
    if (step === 4) return form.investmentProfile.minimumInvestment > 0 && form.investmentProfile.typicalTicketSize > 0;
    return true;
  };

  const handleSubmit = () => {
    const profile: InstitutionalProfile = {
      id: `inst-${Date.now()}`,
      userId: "user-001",
      companyName: form.companyName,
      tradingName: form.tradingName || undefined,
      cacNumber: form.cacNumber,
      companyType: form.companyType,
      incorporationDate: new Date(form.incorporationDate || Date.now()),
      industry: form.industry,
      natureOfBusiness: form.natureOfBusiness,
      countryOfRegistration: form.countryOfRegistration,
      registeredAddress: form.registeredAddress,
      operatingAddress: form.operatingAddress,
      officialEmail: form.officialEmail,
      officialPhone: form.officialPhone,
      website: form.website || undefined,
      institutionType: form.institutionType,
      ownershipType: form.ownershipType,
      authorisedRep: form.authorisedRep,
      investmentProfile: form.investmentProfile,
      onboardingDocuments: [],
      status: "onboarding_submitted",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveInstitutionalProfile(profile);
    setKycStatus("under_review");
    setSubmitted(true);
    setStatusStage("submitted");
  };

  if (submitted) {
    return <StatusView stage={statusStage} setStage={setStatusStage} profile={form} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center justify-center mb-6">
          <img src="/urbco-logo-white.svg" alt="Urbco" className="h-10" />
        </Link>
        <h1 className="text-2xl font-bold text-center mb-1">Institutional Onboarding</h1>
        <p className="text-center text-slate-400 text-sm mb-8">
          KYC / KYB compliance for corporate & institutional investors (Nigeria)
        </p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      done ? "bg-emerald-500 text-white" : active ? "bg-amber-500 text-black" : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {done ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-[10px] mt-1 ${active ? "text-amber-400" : "text-slate-400"} whitespace-nowrap`}>{s.title}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-slate-600 mx-1" />}
              </div>
            );
          })}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {step === 1 && <CompanyInfo form={form} set={set} />}
          {step === 2 && <Classification form={form} set={set} />}
          {step === 3 && <AuthorisedRepForm form={form} set={set} />}
          {step === 4 && <InvestmentProfileForm form={form} set={set} />}
          {step === 5 && <DocumentsForm />}
          {step === 6 && <ReviewForm form={form} />}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {step < 6 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold"
            >
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold">
              Submit Onboarding <ShieldCheck className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-300">{label}</Label>
      {children}
    </div>
  );
}

function CompanyInfo({ form, set }: { form: any; set: any }) {
  return (
    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white"><Building2 className="h-5 w-5 text-amber-400" /> Company Information & CAC</CardTitle>
        <CardDescription className="text-slate-400">Legal entity identity and registered details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Registered Company Name">
            <Input className="bg-white/5 border-white/10 text-white" value={form.companyName} onChange={(e) => set({ companyName: e.target.value })} placeholder="Apex Capital Partners Ltd" />
          </Field>
          <Field label="Trading Name (optional)">
            <Input className="bg-white/5 border-white/10 text-white" value={form.tradingName} onChange={(e) => set({ tradingName: e.target.value })} />
          </Field>
          <Field label="CAC Registration Number">
            <Input className="bg-white/5 border-white/10 text-white" value={form.cacNumber} onChange={(e) => set({ cacNumber: e.target.value })} placeholder="RC 123456" />
          </Field>
          <Field label="Company Type">
            <Select value={form.companyType} onValueChange={(v) => set({ companyType: v })}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="Ltd">Limited (Ltd)</SelectItem>
                <SelectItem value="PLC">Public Limited (PLC)</SelectItem>
                <SelectItem value="LLP">LLP</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Date of Incorporation">
            <Input type="date" className="bg-white/5 border-white/10 text-white" value={form.incorporationDate} onChange={(e) => set({ incorporationDate: e.target.value })} />
          </Field>
          <Field label="Industry / Sector">
            <Input className="bg-white/5 border-white/10 text-white" value={form.industry} onChange={(e) => set({ industry: e.target.value })} placeholder="Asset Management" />
          </Field>
        </div>
        <Field label="Nature of Business">
          <Input className="bg-white/5 border-white/10 text-white" value={form.natureOfBusiness} onChange={(e) => set({ natureOfBusiness: e.target.value })} placeholder="Real estate investment & advisory" />
        </Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Official Email">
            <Input type="email" className="bg-white/5 border-white/10 text-white" value={form.officialEmail} onChange={(e) => set({ officialEmail: e.target.value })} placeholder="compliance@apex.com" />
          </Field>
          <Field label="Official Phone">
            <Input className="bg-white/5 border-white/10 text-white" value={form.officialPhone} onChange={(e) => set({ officialPhone: e.target.value })} placeholder="+234 ..." />
          </Field>
        </div>
        <Field label="Website (optional)">
          <Input className="bg-white/5 border-white/10 text-white" value={form.website} onChange={(e) => set({ website: e.target.value })} placeholder="https://apex.com" />
        </Field>

        <div className="pt-2">
          <h4 className="text-sm font-semibold text-slate-200 mb-2">Registered Address</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <Input className="bg-white/5 border-white/10 text-white" placeholder="Street address" value={form.registeredAddress.address} onChange={(e) => set({ registeredAddress: { ...form.registeredAddress, address: e.target.value } })} />
            <Input className="bg-white/5 border-white/10 text-white" placeholder="City" value={form.registeredAddress.city} onChange={(e) => set({ registeredAddress: { ...form.registeredAddress, city: e.target.value } })} />
            <Input className="bg-white/5 border-white/10 text-white" placeholder="State" value={form.registeredAddress.state} onChange={(e) => set({ registeredAddress: { ...form.registeredAddress, state: e.target.value } })} />
            <Input className="bg-white/5 border-white/10 text-white" placeholder="Country" value={form.registeredAddress.country} onChange={(e) => set({ registeredAddress: { ...form.registeredAddress, country: e.target.value } })} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Classification({ form, set }: { form: any; set: any }) {
  return (
    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white"><Landmark className="h-5 w-5 text-amber-400" /> Investor Classification</CardTitle>
        <CardDescription className="text-slate-400">Tell us about your institution type and ownership.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Institution Type">
          <Select value={form.institutionType} onValueChange={(v) => set({ institutionType: v })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              <SelectItem value="pension-fund">Pension Fund</SelectItem>
              <SelectItem value="asset-manager">Asset Manager</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="private-equity">Private Equity</SelectItem>
              <SelectItem value="family-office">Family Office</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="dfi">DFI</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="reit">REIT</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Ownership Type">
          <Select value={form.ownershipType} onValueChange={(v) => set({ ownershipType: v })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="joint-venture">Joint Venture</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </CardContent>
    </Card>
  );
}

function AuthorisedRepForm({ form, set }: { form: any; set: any }) {
  const rep = form.authorisedRep;
  const setRep = (patch: Partial<AuthorisedRep>) => set({ authorisedRep: { ...rep, ...patch } });
  return (
    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white"><User className="h-5 w-5 text-amber-400" /> Authorised Representative</CardTitle>
        <CardDescription className="text-slate-400">The signatory authorised to act on behalf of the institution.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name">
            <Input className="bg-white/5 border-white/10 text-white" value={rep.fullName} onChange={(e) => setRep({ fullName: e.target.value })} />
          </Field>
          <Field label="Position / Title">
            <Input className="bg-white/5 border-white/10 text-white" value={rep.position} onChange={(e) => setRep({ position: e.target.value })} placeholder="Chief Investment Officer" />
          </Field>
          <Field label="Department">
            <Input className="bg-white/5 border-white/10 text-white" value={rep.department} onChange={(e) => setRep({ department: e.target.value })} placeholder="Investments" />
          </Field>
          <Field label="Email">
            <Input type="email" className="bg-white/5 border-white/10 text-white" value={rep.email} onChange={(e) => setRep({ email: e.target.value })} />
          </Field>
          <Field label="Phone">
            <Input className="bg-white/5 border-white/10 text-white" value={rep.phone} onChange={(e) => setRep({ phone: e.target.value })} />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}

function MultiChips({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onToggle(o)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
            selected.includes(o) ? "bg-amber-500 text-black border-amber-500" : "bg-white/5 text-slate-300 border-white/10 hover:border-white/30"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function InvestmentProfileForm({ form, set }: { form: any; set: any }) {
  const ip = form.investmentProfile;
  const setIp = (patch: Partial<InvestmentProfile>) => set({ investmentProfile: { ...ip, ...patch } });
  return (
    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white"><Target className="h-5 w-5 text-amber-400" /> Investment Profile</CardTitle>
        <CardDescription className="text-slate-400">Your mandate, preferences and ticket sizing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Investment Objective">
          <Input className="bg-white/5 border-white/10 text-white" value={ip.investmentObjective} onChange={(e) => setIp({ investmentObjective: e.target.value })} placeholder="Capital preservation with steady yield" />
        </Field>
        <Field label="Preferred Sectors">
          <MultiChips options={SECTORS} selected={ip.preferredSectors} onToggle={(v) => setIp({ preferredSectors: toggle(ip.preferredSectors, v) })} />
        </Field>
        <Field label="Preferred Project Types">
          <MultiChips options={PROJECT_TYPES} selected={ip.preferredProjectTypes} onToggle={(v) => setIp({ preferredProjectTypes: toggle(ip.preferredProjectTypes, v) })} />
        </Field>
        <Field label="Geographic Preference">
          <MultiChips options={GEO} selected={ip.geographicPreference} onToggle={(v) => setIp({ geographicPreference: toggle(ip.geographicPreference, v) })} />
        </Field>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Minimum Investment (₦)">
            <Input type="number" className="bg-white/5 border-white/10 text-white" value={ip.minimumInvestment || ""} onChange={(e) => setIp({ minimumInvestment: Number(e.target.value) })} />
          </Field>
          <Field label="Typical Ticket Size (₦)">
            <Input type="number" className="bg-white/5 border-white/10 text-white" value={ip.typicalTicketSize || ""} onChange={(e) => setIp({ typicalTicketSize: Number(e.target.value) })} />
          </Field>
          <Field label="Maximum Investment (₦)">
            <Input type="number" className="bg-white/5 border-white/10 text-white" value={ip.maximumInvestment || ""} onChange={(e) => setIp({ maximumInvestment: Number(e.target.value) })} />
          </Field>
        </div>
        <Field label="Investment Horizon">
          <Input className="bg-white/5 border-white/10 text-white" value={ip.investmentHorizon} onChange={(e) => setIp({ investmentHorizon: e.target.value })} placeholder="3-5 years" />
        </Field>
        <Field label="Preferred Structure">
          <MultiChips options={[...STRUCTURES]} selected={ip.preferredStructure} onToggle={(v) => setIp({ preferredStructure: toggle(ip.preferredStructure, v) as InvestmentProfile["preferredStructure"] })} />
        </Field>
      </CardContent>
    </Card>
  );
}

function DocumentsForm() {
  const docs = [
    { name: "CAC Certificate", required: true },
    { name: "CAC Extract / Status Report", required: true },
    { name: "Memorandum & Articles of Association", required: true },
    { name: "Tax Identification (TIN)", required: true },
    { name: "Proof of Registered Address", required: true },
    { name: "Regulatory License (if applicable)", required: false },
    { name: "Authorised Rep ID", required: true },
    { name: "Authorised Signatory Verification", required: true },
  ];
  return (
    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white"><FileText className="h-5 w-5 text-amber-400" /> Compliance Documents</CardTitle>
        <CardDescription className="text-slate-400">Upload corporate & KYB documentation.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-3">
        {docs.map((d) => (
          <div key={d.name} className="border-2 border-dashed border-white/10 rounded-2xl p-4 text-center hover:border-amber-400 transition-colors cursor-pointer">
            <Upload className="h-7 w-7 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-200">{d.name}</p>
            <p className="text-[11px] text-slate-500 mt-1">{d.required ? "Required" : "Optional"} · PDF/PNG ≤ 15MB</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ReviewForm({ form }: { form: any }) {
  return (
    <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white"><ShieldCheck className="h-5 w-5 text-amber-400" /> Review & Submit</CardTitle>
        <CardDescription className="text-slate-400">Confirm the information below is accurate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <div className="text-slate-400">Company</div>
          <div className="font-semibold text-white">{form.companyName} · {form.cacNumber}</div>
        </div>
        <div>
          <div className="text-slate-400">Classification</div>
          <div className="font-semibold text-white capitalize">{form.institutionType} · {form.ownershipType}</div>
        </div>
        <div>
          <div className="text-slate-400">Authorised Rep</div>
          <div className="font-semibold text-white">{form.authorisedRep.fullName} — {form.authorisedRep.position}</div>
        </div>
        <div>
          <div className="text-slate-400">Ticket Range</div>
          <div className="font-semibold text-white">₦{form.investmentProfile.minimumInvestment.toLocaleString()} – ₦{form.investmentProfile.maximumInvestment.toLocaleString()} (typical ₦{form.investmentProfile.typicalTicketSize.toLocaleString()})</div>
        </div>
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs">
          On submit, your profile enters KYC / KYB review: CAC verification, UBO identification, and sanctions / PEP / adverse-media / AML screening. You will be notified of the outcome.
        </div>
      </CardContent>
    </Card>
  );
}

function StatusView({ stage, setStage, profile }: { stage: any; setStage: any; profile: any }) {
  const stages = [
    { key: "submitted", label: "Onboarding Submitted", icon: CheckCircle },
    { key: "cac", label: "CAC Verification", icon: Landmark },
    { key: "ubo", label: "UBO Identification", icon: Users },
    { key: "screening", label: "Sanctions / PEP / AML Screening", icon: ShieldCheck },
    { key: "verified", label: "Institutional Investor Verified", icon: CheckCircle },
  ];
  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <img src="/urbco-logo-white.svg" alt="Urbco" className="h-10 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-center mb-2">KYC / KYB Status</h1>
        <p className="text-center text-slate-400 text-sm mb-8">{profile.companyName || "Your institution"} · {profile.cacNumber}</p>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-xl text-slate-100">
          <CardContent className="p-6 space-y-4">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const done = i < currentIndex || stage === "verified";
              const active = i === currentIndex && stage !== "verified";
              return (
                <div key={s.key} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${done ? "bg-emerald-500 text-white" : active ? "bg-amber-500 text-black animate-pulse" : "bg-white/10 text-slate-500"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-sm ${done ? "text-white" : active ? "text-amber-300 font-semibold" : "text-slate-500"}`}>{s.label}</span>
                  {active && <Badge className="ml-auto bg-amber-500 text-black">In Progress</Badge>}
                  {done && <Badge variant="secondary" className="ml-auto">Cleared</Badge>}
                </div>
              );
            })}

            {stage === "verified" && (
              <div className="pt-2 text-center">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-emerald-300 font-semibold">Your institution is fully verified.</p>
                <Link href="/marketplace"><Button className="mt-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white">Browse Allocations</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Simulated progression controls (mock review) */}
        {stage !== "verified" && (
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" className="rounded-xl" onClick={() => {
              const order = ["submitted", "cac", "ubo", "screening", "verified"];
              const idx = order.indexOf(stage);
              setStage(order[Math.min(idx + 1, order.length - 1)]);
            }}>
              Simulate Next Review Stage
            </Button>
          </div>
        )}
        <p className="text-center text-xs text-slate-500 mt-4">
          In production, CAC (via API), UBO and screening providers run automatically. Remediation items surface here if verification fails.
        </p>
      </div>
    </div>
  );
}
