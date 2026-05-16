"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, FileText, Camera, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/stores/appStore";

export default function KYCPage() {
  const { user } = useAppStore();
  const [kycStep, setKycStep] = useState(1);

  const steps = [
    { number: 1, title: "Identity Verification", description: "Upload a valid ID" },
    { number: 2, title: "Selfie Verification", description: "Take a selfie with your ID" },
    { number: 3, title: "Address Verification", description: "Upload proof of address" },
    { number: 4, title: "Review & Submit", description: "Review and submit documents" },
  ];

  const isVerified = user?.kycStatus === "verified";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">KYC Verification</h1>
        <p className="text-slate-500">Complete your identity verification to unlock full access</p>
      </div>

      {/* Status Card */}
      <Card className={isVerified ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {isVerified ? (
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {isVerified ? "KYC Verified" : "KYC Verification Required"}
              </h3>
              <p className="text-slate-600">
                {isVerified
                  ? "Your identity has been verified. You can invest without restrictions."
                  : "Complete KYC verification to unlock higher investment limits and full platform access."}
              </p>
            </div>
            {!isVerified && (
              <Badge variant="warning" className="ml-auto">
                Pending Verification
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {!isVerified && (
        <>
          {/* Progress Steps */}
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`p-4 rounded-xl border-2 transition-all ${
                  kycStep >= step.number
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  kycStep > step.number ? "bg-emerald-600 text-white" :
                  kycStep === step.number ? "bg-emerald-100 text-emerald-600" :
                  "bg-slate-100 text-slate-400"
                }`}>
                  {kycStep > step.number ? <CheckCircle className="h-6 w-6" /> : step.number}
                </div>
                <h4 className="font-semibold text-slate-900">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Upload Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ID Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                  Identity Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="font-medium text-slate-900 mb-2">Upload ID Document</p>
                  <p className="text-sm text-slate-500 mb-4">
                    Accepts: Passport, Driver&apos;s License, National ID, or Voter&apos;s Card
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selfie Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-emerald-600" />
                  Selfie with ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                  <Camera className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="font-medium text-slate-900 mb-2">Take Selfie</p>
                  <p className="text-sm text-slate-500 mb-4">
                    Hold your ID next to your face and take a clear photo
                  </p>
                  <Button variant="outline" size="sm">
                    Take Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Address Proof */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-emerald-600" />
                  Proof of Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="font-medium text-slate-900 mb-2">Upload Address Proof</p>
                  <p className="text-sm text-slate-500 mb-4">
                    Utility bill, bank statement, or tenancy agreement (not older than 3 months)
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-emerald-500 focus:outline-none"
                    placeholder="Your occupation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Source of Funds
                  </label>
                  <select className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-emerald-500 focus:outline-none">
                    <option>Select source</option>
                    <option>Employment</option>
                    <option>Business</option>
                    <option>Investments</option>
                    <option>Inheritance</option>
                    <option>Other</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button variant="premium" size="lg">
              Submit for Verification <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Info Box */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Verification Process</h4>
                  <p className="text-sm text-blue-800">
                    Your documents will be reviewed within 24-48 hours. You&apos;ll receive a notification once your KYC is verified.
                    Ensure all documents are clear, valid, and not expired.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
