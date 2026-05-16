"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import KYCPage from "@/components/pages/profile/kyc-page";

export default function KYC() {
  return (
    <DashboardLayout>
      <KYCPage />
    </DashboardLayout>
  );
}
