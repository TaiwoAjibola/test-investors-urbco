"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import ReferralsPage from "@/components/pages/referrals/referrals-page";

export default function Referrals() {
  return (
    <DashboardLayout>
      <ReferralsPage />
    </DashboardLayout>
  );
}
