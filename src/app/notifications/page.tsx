"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import NotificationsPage from "@/components/pages/notifications/notifications-page";

export default function Notifications() {
  return (
    <DashboardLayout>
      <NotificationsPage />
    </DashboardLayout>
  );
}
