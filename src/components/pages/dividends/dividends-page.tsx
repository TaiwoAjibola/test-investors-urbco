"use client";

import { motion } from "framer-motion";
import { DollarSign, Calendar, TrendingUp, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dividends } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DividendsPage() {
  const paidDividends = dividends.filter((d) => d.status === "paid");
  const upcomingDividends = dividends.filter((d) => d.status === "upcoming" || d.status === "pending");
  const totalPaid = paidDividends.reduce((sum, d) => sum + d.amount, 0);
  const totalUpcoming = upcomingDividends.reduce((sum, d) => sum + d.amount, 0);

  const monthlyData = [
    { month: "Jul", amount: 0 },
    { month: "Aug", amount: 0 },
    { month: "Sep", amount: 0 },
    { month: "Oct", amount: 518312 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dividends</h1>
          <p className="text-slate-500">Track your rental income and returns</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Paid</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(totalPaid)}</div>
            <div className="text-sm text-slate-500 mt-2">Lifetime dividends</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Upcoming</CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(totalUpcoming)}</div>
            <div className="text-sm text-slate-500 mt-2">Pending payments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Annual Projection</CardTitle>
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{formatCurrency(totalPaid * 4)}</div>
            <div className="text-sm text-slate-500 mt-2">Based on current holdings</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Dividend History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `₦${value / 1000}`} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Amount"]} />
                <Bar dataKey="amount" fill="#870F73" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Paid/Upcoming */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Dividends</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dividend Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dividends.map((dividend, index) => (
                  <motion.div
                    key={dividend.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        dividend.status === "paid" ? "bg-emerald-100" : "bg-amber-100"
                      }`}>
                        <DollarSign className={`h-6 w-6 ${
                          dividend.status === "paid" ? "text-emerald-600" : "text-amber-600"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{dividend.propertyName}</h4>
                        <p className="text-sm text-slate-500">{dividend.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-slate-900">{formatCurrency(dividend.amount)}</p>
                      <div className="flex items-center justify-end space-x-2 mt-1">
                        <Badge variant={dividend.status === "paid" ? "success" : "warning"}>
                          {dividend.status === "paid" ? "Paid" : dividend.status === "pending" ? "Pending" : "Upcoming"}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {new Date(dividend.paymentDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {paidDividends.map((dividend) => (
                  <div key={dividend.id} className="flex items-center justify-between p-4 rounded-xl bg-emerald-50">
                    <div>
                      <h4 className="font-semibold text-slate-900">{dividend.propertyName}</h4>
                      <p className="text-sm text-slate-500">{dividend.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">{formatCurrency(dividend.amount)}</p>
                      <p className="text-xs text-slate-500">{new Date(dividend.paymentDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {upcomingDividends.map((dividend) => (
                  <div key={dividend.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50">
                    <div>
                      <h4 className="font-semibold text-slate-900">{dividend.propertyName}</h4>
                      <p className="text-sm text-slate-500">{dividend.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-600">{formatCurrency(dividend.amount)}</p>
                      <p className="text-xs text-slate-500">{new Date(dividend.paymentDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
