"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import WalletPage from "@/components/pages/wallet/wallet-page";

export default function Wallet() {
  return (
    <DashboardLayout>
      <WalletPage />
    </DashboardLayout>
  );
}
