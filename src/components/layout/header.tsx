"use client";

import { Bell, Menu, Search, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/appStore";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  const { toggleSidebar, user, wallet } = useAppStore();
  const unreadCount = useAppStore((state) => state.notifications.filter((n) => !n.read).length);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 backdrop-blur-xl px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search properties, investments..."
            className="w-72 bg-slate-50/80 border-slate-200/80 rounded-lg pl-9 h-10 focus:bg-white"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Wallet Balance */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-emerald-50/70 ring-1 ring-inset ring-emerald-100 rounded-lg">
          <Wallet className="h-4 w-4 text-emerald-600" />
          <span className="text-[13px] font-semibold text-emerald-700">
            {formatCurrency(wallet.balance)}
          </span>
        </div>

        {/* Notifications */}
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="rounded-lg cursor-pointer">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </Button>
        </Link>

        {/* User Profile */}
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-slate-100"
              />
            ) : (
              <span className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-semibold text-white">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}