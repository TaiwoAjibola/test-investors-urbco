"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, Trash2, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications } from "@/data/mockData";
import { useAppStore } from "@/stores/appStore";

export default function NotificationsPage() {
  const { notifications: allNotifications, markNotificationAsRead, markAllNotificationsAsRead } = useAppStore();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredNotifications = allNotifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "dividend":
        return <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><span className="text-2xl">💰</span></div>;
      case "payment":
        return <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center"><span className="text-2xl">💳</span></div>;
      case "opportunity":
        return <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-2xl">🏢</span></div>;
      case "asset":
        return <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center"><span className="text-2xl">📊</span></div>;
      case "alert":
        return <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"><span className="text-2xl">⚠️</span></div>;
      default:
        return <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"><Bell className="h-6 w-6 text-slate-600" /></div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500">Stay updated with your investments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notifications List */}
      <Card>
        <CardContent className="pt-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No notifications</h3>
              <p className="text-slate-500">You&apos;re all caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                    notification.read ? "bg-slate-50" : "bg-gradient-to-r from-emerald-50 to-teal-50"
                  } hover:shadow-md`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{notification.title}</h4>
                        <p className="text-slate-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Badge variant="success" className="text-xs">New</Badge>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-slate-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
