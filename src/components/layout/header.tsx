"use client";

import { Bell, Menu, Search, User } from "lucide-react";
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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
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
            className="pl-10 w-80 bg-slate-50 border-slate-200"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Wallet Balance */}
        <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
          <span className="text-sm text-slate-600">Wallet:</span>
          <span className="font-semibold text-emerald-600">
            {formatCurrency(wallet.balance)}
          </span>
        </div>

        {/* Notifications */}
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </Button>
        </Link>

        {/* User Profile */}
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
