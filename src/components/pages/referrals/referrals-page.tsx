"use client";

import { motion } from "framer-motion";
import { Gift, Users, DollarSign, Copy, Share2, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { referral } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function ReferralsPage() {
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referral.referralLink);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Refer & Earn</h1>
        <p className="text-slate-500">Invite friends and earn rewards</p>
      </div>

      {/* Hero Card */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Referral Code</h2>
              <div className="text-4xl font-bold mb-4 tracking-wider">{referral.referralCode}</div>
              <p className="text-emerald-100 mb-6">
                Share your referral link and earn ₦100,000 for every friend who invests!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={copyReferralLink}
                  className="bg-white text-emerald-600 hover:bg-emerald-50"
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy Link
                </Button>
                <Button variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-5xl font-bold mb-2">{formatCurrency(referral.totalRewards)}</div>
              <div className="text-emerald-100">Total Rewards Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Referrals</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{referral.totalReferrals}</div>
            <div className="text-sm text-slate-500 mt-2">People invited</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Referrals</CardTitle>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{referral.activeReferrals}</div>
            <div className="text-sm text-slate-500 mt-2">Have joined</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Rewards Earned</CardTitle>
            <DollarSign className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{formatCurrency(referral.totalRewards)}</div>
            <div className="text-sm text-slate-500 mt-2">Ready to withdraw</div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Referrals Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Share Your Link</h4>
              <p className="text-sm text-slate-600">Send your unique referral link to friends and family</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">They Sign Up</h4>
              <p className="text-sm text-slate-600">Your friend creates an account and completes KYC</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Earn Rewards</h4>
              <p className="text-sm text-slate-600">Get ₦100,000 when they make their first investment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referral.referrals.map((ref, index) => (
              <motion.div
                key={ref.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                    {ref.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{ref.name}</h4>
                    <p className="text-sm text-slate-500">{ref.email}</p>
                    <p className="text-xs text-slate-400 mt-1">Joined {new Date(ref.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={ref.status === "invested" ? "success" : ref.status === "active" ? "info" : "default"}>
                    {ref.status}
                  </Badge>
                  {ref.reward > 0 && (
                    <p className="text-sm font-semibold text-emerald-600 mt-1">+{formatCurrency(ref.reward)}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
