"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import MarketplacePage from "@/components/pages/marketplace/marketplace-page";

export default function Marketplace() {
  return (
    <DashboardLayout>
      <MarketplacePage />
    </DashboardLayout>
  );
}
