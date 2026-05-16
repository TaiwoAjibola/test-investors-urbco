"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import SettingsPage from "@/components/pages/settings/settings-page";

export default function Settings() {
  return (
    <DashboardLayout>
      <SettingsPage />
    </DashboardLayout>
  );
}
