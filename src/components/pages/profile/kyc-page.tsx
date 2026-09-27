"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Camera,
  Shield,
  ArrowRight,
  User,
  Briefcase,
  Building2,
  Lock,
  Crown,
  Anchor,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/stores/appStore";
import Link from "next/link";

export default function KYCPage() {
  const { user, setKycStatus } = useAppStore();
  const [entityType, setEntityType] = useState<"individual" | "family-office" | "institution">(
    (user?.entityType as any) || "individual"
  );
  const [kycStep, setKycStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const isVerified = user?.kycStatus === "verified";
  const kycStatus = user?.kycStatus;
  const isFailed = kycStatus === "failed";
  const isRemediation = kycStatus === "remediation_required";
  const showReview = submitted || kycStatus === "under_review";

  const getEntityRequirements = () => {
    switch (entityType) {
      case "family-office":
        return [
          { number: 1, title: "Articles of Incorporation", description: "Upload Family Office Registration or Deed" },
          { number: 2, title: "Trustee/Director Passports", description: "Valid IDs of authorized managing trustees" },
          { number: 3, title: "Proof of AUM / Asset Scale", description: "Audited statement or bank reference (> $10M+ AUM)" },
          { number: 4, title: "Beneficial Ownership (UBO)", description: "Ultimate Beneficial Owner Register & Tax ID" },
        ];
      case "institution":
        return [
          { number: 1, title: "Corporate Registration & Tax ID", description: "Certificate of Incorporation & TIN/LEI" },
          { number: 2, title: "Board Resolution Letter", description: "Authorized delegation for real estate investment" },
          { number: 3, title: "Officer / Director Identification", description: "Government photo IDs of signatory officers" },
          { number: 4, title: "AML Compliance Certificate", description: "Audited Financials & Anti-Money Laundering Declaration" },
        ];
      default: // Individual
        return [
          { number: 1, title: "Government Photo ID", description: "Passport, Driver's License, or National ID" },
          { number: 2, title: "Live Biometric Selfie", description: "Clear photo holding your photo ID" },
          { number: 3, title: "Proof of Address", description: "Utility bill or bank statement (< 3 months)" },
          { number: 4, title: "Accreditation Questionnaire", description: "Investor risk profile & source of funds" },
        ];
    }
  };

  const steps = getEntityRequirements();

  const handleFakeSubmit = () => {
    setSubmitted(true);
    setKycStatus("under_review");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">KYC & Institutional Verification</h1>
          <p className="text-slate-500">
            Tailored compliance for Individual, Family Office, and Institutional tiers across Opco Foundry & Harbor
          </p>
        </div>

        {/* Entity Selector Pills */}
        <div className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 shadow-sm">
          <button
            onClick={() => {
              setEntityType("individual");
              setKycStep(1);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              entityType === "individual"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="h-3.5 w-3.5 text-emerald-600" />
            Individual
          </button>

          <button
            onClick={() => {
              setEntityType("family-office");
              setKycStep(1);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              entityType === "family-office"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
                : "text-purple-700 hover:text-purple-800"
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            Family Office
          </button>

          <button
            onClick={() => {
              setEntityType("institution");
              setKycStep(1);
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              entityType === "institution"
                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-sm"
                : "text-amber-700 hover:text-amber-800"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            Institution
          </button>
        </div>
      </div>

      {/* Verification Status Banner */}
      <Card className={
        isVerified ? "bg-emerald-50 border-emerald-200"
        : isFailed ? "bg-red-50 border-red-200"
        : isRemediation ? "bg-orange-50 border-orange-200"
        : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
      }>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {isVerified ? (
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-7 w-7 text-emerald-600" />
              </div>
            ) : isFailed ? (
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-7 w-7 text-red-600" />
              </div>
            ) : isRemediation ? (
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-7 w-7 text-orange-600" />
              </div>
            ) : showReview ? (
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-7 w-7 text-amber-600" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">
                  {isVerified
                    ? "KYC Verified"
                    : isFailed
                    ? "Verification Failed"
                    : isRemediation
                    ? "Remediation Required"
                    : showReview
                    ? "Verification Under Review"
                    : `KYC Required for ${entityType === "family-office" ? "Family Office" : entityType === "institution" ? "Institutional Tier" : "Individual Tier"}`}
                </h3>
                <Badge
                  className={
                    entityType === "family-office"
                      ? "bg-purple-600 text-white"
                      : entityType === "institution"
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-emerald-600 text-white"
                  }
                >
                  {entityType.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {isVerified
                  ? "Your entity status is fully verified. Unlimited access to Opco Foundry & Harbor allocations."
                  : isFailed
                  ? "Your verification could not be completed. Please review the issues and resubmit your documents."
                  : isRemediation
                  ? "Additional information is required to complete your verification."
                  : showReview
                  ? "Your compliance documents have been submitted securely to independent trustees. Expected review window: 12-24 hours."
                  : `Please upload the required ${entityType === "individual" ? "personal identity" : "corporate/legal"} documents below to unlock platform allocation.`}
              </p>
              {isRemediation && user?.kycRemediationItems && user.kycRemediationItems.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-orange-700 space-y-0.5">
                  {user.kycRemediationItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {!isVerified && !submitted && entityType === "institution" && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6 text-center space-y-3">
            <Building2 className="h-12 w-12 text-amber-600 mx-auto" />
            <h3 className="text-xl font-bold text-amber-900">Institutional onboarding is handled separately</h3>
            <p className="text-sm text-amber-800 max-w-md mx-auto">
              Corporate & institutional KYC/KYB (CAC verification, UBO identification, sanctions / PEP / adverse-media / AML screening) is completed via the dedicated onboarding flow.
            </p>
            <Link href="/onboard/institutional">
              <Button className="mt-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold">
                Start Institutional Onboarding <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!isVerified && !submitted && entityType !== "institution" && (
        <>
          {/* Progress Steps for Active Entity */}
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                onClick={() => setKycStep(step.number)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  kycStep === step.number
                    ? entityType === "family-office"
                      ? "border-purple-500 bg-purple-50/50 shadow-md"
                      : "border-emerald-500 bg-emerald-50/50 shadow-md"
                    : kycStep > step.number
                    ? "border-slate-300 bg-slate-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 font-bold text-sm ${
                    kycStep > step.number
                      ? "bg-slate-900 text-white"
                      : kycStep === step.number
                      ? entityType === "family-office"
                        ? "bg-purple-600 text-white"
                        : "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {kycStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.number}
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Dynamic Document Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Document 1 Upload */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-amber-600" />
                  {steps[0].title}
                </CardTitle>
                <CardDescription className="text-xs">{steps[0].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer bg-slate-50/50">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 text-sm mb-1">Click or drag file to upload</p>
                  <p className="text-xs text-slate-500 mb-3">Accepts PDF, PNG, JPG (Max 15MB)</p>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Select File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document 2 Upload */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-600" />
                  {steps[1].title}
                </CardTitle>
                <CardDescription className="text-xs">{steps[1].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer bg-slate-50/50">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 text-sm mb-1">Click or drag file to upload</p>
                  <p className="text-xs text-slate-500 mb-3">Accepts PDF, PNG, JPG (Max 15MB)</p>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Select File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document 3 Upload */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Award className="h-5 w-5 mr-2 text-cyan-600" />
                  {steps[2].title}
                </CardTitle>
                <CardDescription className="text-xs">{steps[2].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-cyan-400 transition-colors cursor-pointer bg-slate-50/50">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 text-sm mb-1">Click or drag file to upload</p>
                  <p className="text-xs text-slate-500 mb-3">Accepts PDF, PNG, JPG (Max 15MB)</p>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Select File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Entity Declarations */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-emerald-600" />
                  {steps[3].title}
                </CardTitle>
                <CardDescription className="text-xs">{steps[3].description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {entityType === "individual"
                      ? "Source of Funds"
                      : entityType === "family-office"
                      ? "Declared AUM Range"
                      : "Institutional Tax ID / LEI Number"}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none bg-slate-50"
                    placeholder={
                      entityType === "individual"
                        ? "e.g. Executive Salary / Investment Income"
                        : entityType === "family-office"
                        ? "e.g. $50M - $100M AUM"
                        : "e.g. LEI-984900A12B34C56"
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Investment Track
                  </label>
                  <select className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none bg-slate-50">
                    <option value="foundry">Opco Foundry (High Value & Institutional &gt; $200M)</option>
                    <option value="harbor">Opco Harbor (Retail Fractional)</option>
                    <option value="both">Both Ecosystems</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleFakeSubmit}
              size="lg"
              className={`rounded-2xl px-8 py-6 font-bold shadow-lg text-base ${
                entityType === "family-office"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20"
              }`}
            >
              Submit {entityType === "family-office" ? "Family Office" : "Individual"} Verification Documents <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </>
      )}

      {submitted && !isVerified && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center space-y-3">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-xl font-bold text-blue-900">Documents Submitted Successfully</h3>
            <p className="text-sm text-blue-800 max-w-md mx-auto">
              Thank you! Our institutional compliance team and trustees are reviewing your {entityType} documents. You will receive an email and in-app notification once verified.
            </p>
            <Button
              variant="outline"
              className="border-blue-300 text-blue-900 hover:bg-blue-100 mt-2"
              onClick={() => setSubmitted(false)}
            >
              Update / Re-upload Documents
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
