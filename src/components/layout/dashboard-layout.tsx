"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useAppStore } from "@/stores/appStore";
import { cn } from "@/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          "lg:ml-72"
        )}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
