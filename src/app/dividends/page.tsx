"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import DividendsPage from "@/components/pages/dividends/dividends-page";

export default function Dividends() {
  return (
    <DashboardLayout>
      <DividendsPage />
    </DashboardLayout>
  );
}
