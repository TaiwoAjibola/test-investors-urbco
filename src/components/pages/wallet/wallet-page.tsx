"use client";

import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, Download, Plus, ArrowUpRight, CreditCard, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transactions, wallet } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const totalDeposits = transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0);
  const totalInvestments = transactions.filter((t) => t.type === "investment").reduce((sum, t) => sum + t.amount, 0);
  const totalDividends = transactions.filter((t) => t.type === "dividend").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Wallet</h1>
          <p className="text-slate-500">Manage your funds and transactions</p>
        </div>
      </div>

      {/* Wallet Card */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-emerald-100 mb-2">Available Balance</p>
              <h2 className="text-4xl font-bold">{formatCurrency(wallet.balance)}</h2>
            </div>
            <Wallet className="h-16 w-16 text-emerald-200 opacity-50" />
          </div>
          <div className="flex space-x-4">
            <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
              <DialogTrigger asChild>
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                  <Plus className="mr-2 h-4 w-4" /> Deposit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deposit Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Amount (₦)</Label>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button variant="premium" className="w-full">
                    Proceed to Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Amount (₦)</Label>
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button variant="premium" className="w-full">
                    Request Withdrawal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Deposits</CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalDeposits)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Investments</CardTitle>
            <Building className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalInvestments)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Dividends</CardTitle>
            <TrendingDown className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalDividends)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="investment">Investments</TabsTrigger>
              <TabsTrigger value="dividend">Dividends</TabsTrigger>
              <TabsTrigger value="deposit">Deposits</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === "investment" ? "bg-blue-100" :
                        transaction.type === "dividend" ? "bg-emerald-100" :
                        transaction.type === "deposit" ? "bg-amber-100" : "bg-slate-100"
                      }`}>
                        {transaction.type === "investment" && <Building className="h-6 w-6 text-blue-600" />}
                        {transaction.type === "dividend" && <TrendingDown className="h-6 w-6 text-emerald-600" />}
                        {transaction.type === "deposit" && <Plus className="h-6 w-6 text-amber-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{transaction.description}</h4>
                        <p className="text-sm text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === "dividend" || transaction.type === "deposit" ? "text-emerald-600" : "text-slate-900"
                      }`}>
                        {transaction.type === "dividend" || transaction.type === "deposit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <Badge variant={transaction.status === "completed" ? "success" : "warning"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="investment" className="mt-6">
              <div className="space-y-3">
                {transactions.filter((t) => t.type === "investment").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                    <div>
                      <h4 className="font-semibold text-slate-900">{transaction.description}</h4>
                      <p className="text-sm text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">-{formatCurrency(transaction.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dividend" className="mt-6">
              <div className="space-y-3">
                {transactions.filter((t) => t.type === "dividend").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-emerald-50">
                    <div>
                      <h4 className="font-semibold text-slate-900">{transaction.description}</h4>
                      <p className="text-sm text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">+{formatCurrency(transaction.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="deposit" className="mt-6">
              <div className="space-y-3">
                {transactions.filter((t) => t.type === "deposit").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50">
                    <div>
                      <h4 className="font-semibold text-slate-900">{transaction.description}</h4>
                      <p className="text-sm text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-600">+{formatCurrency(transaction.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
