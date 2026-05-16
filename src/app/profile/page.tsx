"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import ProfilePage from "@/components/pages/profile/profile-page";

export default function Profile() {
  return (
    <DashboardLayout>
      <ProfilePage />
    </DashboardLayout>
  );
}
