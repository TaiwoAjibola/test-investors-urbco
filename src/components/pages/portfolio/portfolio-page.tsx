"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, DollarSign, Calendar, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { investments, dashboardMetrics } from "@/data/mockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import Link from "next/link";

const COLORS = ["#10b981", "#14b8a6", "#06b6d4", "#0ea5e9"];

export default function PortfolioPage() {
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValuation, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amountInvested, 0);
  const totalROI = ((totalValue - totalInvested) / totalInvested) * 100;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Portfolio</h1>
          <p className="text-slate-500">Track your real estate investments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Value</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(totalValue)}</div>
            <div className="flex items-center mt-2 text-sm text-emerald-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{formatPercentage(totalROI)} total return</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Amount Invested</CardTitle>
            <PieChartIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(totalInvested)}</div>
            <div className="text-sm text-slate-500 mt-2">Across {investments.length} properties</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Returns</CardTitle>
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">+{formatCurrency(totalValue - totalInvested)}</div>
            <div className="text-sm text-slate-500 mt-2">Unrealized gains</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardMetrics.portfolioGrowth}>
                <defs>
                  <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `₦${value / 1000000}M`} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Value"]} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#colorPortfolio)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Investments List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/assets/${investment.property.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <img
                      src={investment.property.images[0]}
                      alt={investment.property.name}
                      className="w-full md:w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-lg">{investment.property.name}</h4>
                          <p className="text-sm text-slate-500">{investment.property.location}</p>
                        </div>
                        <Badge variant={investment.roi >= 0 ? "success" : "danger"}>
                          {investment.roi >= 0 ? "+" : ""}{formatPercentage(investment.roi)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Invested</p>
                          <p className="font-semibold text-slate-900">{formatCurrency(investment.amountInvested)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Current Value</p>
                          <p className="font-semibold text-emerald-600">{formatCurrency(investment.currentValuation)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Fractions Owned</p>
                          <p className="font-semibold text-slate-900">{investment.fractionsOwned}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Next Dividend</p>
                          <p className="font-semibold text-slate-900">{new Date(investment.nextDividendDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
