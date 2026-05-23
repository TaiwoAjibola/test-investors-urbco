"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, PieChart, Wallet, ArrowUpRight, ArrowDownRight, Building2, Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import { dashboardMetrics, investments, dividends, notifications, properties } from "@/data/mockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";

const COLORS = ["#870F73", "#D4A065", "#06b6d4", "#0ea5e9"];

export default function DashboardPage() {
  const recentNotifications = notifications.slice(0, 3);
  const upcomingDividends = dividends.filter((d) => d.status === "upcoming" || d.status === "pending").slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here&apos;s your investment overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/marketplace">
            <Button variant="outline">
              <Building2 className="mr-2 h-4 w-4" /> Browse Properties
            </Button>
          </Link>
          <Link href="/wallet">
            <Button variant="premium">
              <Wallet className="mr-2 h-4 w-4" /> Add Funds
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Invested</CardTitle>
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(dashboardMetrics.totalInvested)}</div>
              <div className="flex items-center mt-2 text-sm text-emerald-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Portfolio Value</CardTitle>
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(dashboardMetrics.portfolioValue)}</div>
              <div className="flex items-center mt-2 text-sm text-emerald-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+8.6% growth</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Annual Returns</CardTitle>
              <PieChart className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(dashboardMetrics.projectedAnnualReturns)}</div>
              <div className="text-sm text-slate-500 mt-2">Projected for next 12 months</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Dividends Earned</CardTitle>
              <Wallet className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(dashboardMetrics.totalDividendsEarned)}</div>
              <div className="flex items-center mt-2 text-sm text-emerald-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>Lifetime earnings</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
              <CardDescription>Your investment value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardMetrics.portfolioGrowth}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#870F73" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#870F73" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={(value) => `₦${value / 1000000}M`} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(Number(value)), "Value"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#870F73"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Asset Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Distribution by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={dashboardMetrics.assetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dashboardMetrics.assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {dashboardMetrics.assetAllocation.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{formatPercentage(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Investments</CardTitle>
                <CardDescription>Your current property holdings</CardDescription>
              </div>
              <Link href="/portfolio">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <Link key={investment.id} href={`/assets/${investment.property.id}`}>
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                      <img
                        src={investment.property.images[0]}
                        alt={investment.property.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{investment.property.name}</h4>
                        <p className="text-sm text-slate-500">{investment.property.location}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-slate-600">
                            Invested: <span className="font-medium text-slate-900">{formatCurrency(investment.amountInvested)}</span>
                          </span>
                          <span className="text-sm text-emerald-600">
                            ROI: <span className="font-medium">{formatPercentage(investment.roi)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={investment.roi >= 0 ? "success" : "danger"}>
                          {investment.roi >= 0 ? "+" : ""}{formatPercentage(investment.roi)}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Dividends & Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          {/* Upcoming Dividends */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Dividends</CardTitle>
                <CardDescription>Expected dividend payments</CardDescription>
              </div>
              <Link href="/dividends">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDividends.map((dividend) => (
                  <div key={dividend.id} className="flex items-center justify-between p-3 rounded-lg bg-emerald-50">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-900">{dividend.propertyName}</p>
                        <p className="text-sm text-slate-500">{dividend.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">{formatCurrency(dividend.amount)}</p>
                      <p className="text-xs text-slate-500">{new Date(dividend.paymentDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent updates and alerts</CardDescription>
              </div>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Bell className="h-4 w-4 mr-1" /> View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <Link key={notification.id} href={notification.actionUrl || "#"}>
                    <div className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${notification.read ? "bg-slate-50" : "bg-emerald-50"}`}>
                      <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-slate-300" : "bg-emerald-500"}`} />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{notification.title}</p>
                        <p className="text-sm text-slate-500">{notification.message}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
