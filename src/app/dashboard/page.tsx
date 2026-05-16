"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import DashboardPage from "@/components/pages/dashboard/dashboard-page";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
