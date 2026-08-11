"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  PieChart,
  Wallet,
  Bell,
  Users,
  Settings,
  LogOut,
  Shield,
  Gift,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/appStore";

const navigation = [
  {
    group: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Own-a-Fraction", href: "/marketplace", icon: Building2 },
      { name: "Portfolio", href: "/portfolio", icon: PieChart },
      { name: "Dividends", href: "/dividends", icon: TrendingUp },
      { name: "Wallet", href: "/wallet", icon: Wallet },
    ],
  },
  {
    group: "Account",
    items: [
      { name: "Notifications", href: "/notifications", icon: Bell },
      { name: "Referrals", href: "/referrals", icon: Gift },
      { name: "Profile", href: "/profile", icon: Users },
      { name: "KYC Verification", href: "/profile/kyc", icon: Shield },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar, logout } = useAppStore();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-slate-200/80 transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-5 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center">
            <img src="/urbco-logo.svg" alt="Urbco" className="h-9" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {navigation.map((section) => (
            <div key={section.group} className="mb-6">
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {section.group}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer",
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-emerald-500"
                          />
                        )}
                        <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600")} />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Upgrade card */}
        <div className="px-3 pb-3">
          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-900">Urbco Pro</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Unlock VIP property access and boosted referral rewards.
            </p>
            <Link
              href="/settings"
              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}