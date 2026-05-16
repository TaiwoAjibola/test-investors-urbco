"use client";

import { useState } from "react";
import { Bell, Lock, Palette, Smartphone, Globe, Shield, Mail, Key, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    dividends: true,
    payments: true,
    opportunities: true,
    newsletter: false,
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account preferences</p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-emerald-600" />
            <div>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900">Email Notifications</p>
                <p className="text-sm text-slate-500">Receive updates via email</p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900">Push Notifications</p>
                <p className="text-sm text-slate-500">Receive push notifications</p>
              </div>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Dividend Alerts</p>
              <p className="text-sm text-slate-500">Get notified when dividends are paid</p>
            </div>
            <Switch
              checked={notifications.dividends}
              onCheckedChange={(checked) => setNotifications({ ...notifications, dividends: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Payment Reminders</p>
              <p className="text-sm text-slate-500">Get reminded about upcoming payments</p>
            </div>
            <Switch
              checked={notifications.payments}
              onCheckedChange={(checked) => setNotifications({ ...notifications, payments: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">New Opportunities</p>
              <p className="text-sm text-slate-500">Get notified about new investment opportunities</p>
            </div>
            <Switch
              checked={notifications.opportunities}
              onCheckedChange={(checked) => setNotifications({ ...notifications, opportunities: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Newsletter</p>
              <p className="text-sm text-slate-500">Receive our weekly investment newsletter</p>
            </div>
            <Switch
              checked={notifications.newsletter}
              onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Lock className="h-6 w-6 text-emerald-600" />
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Change Password */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Change Password</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button variant="outline">Update Password</Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-500">Add an extra layer of security</p>
                </div>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </div>

          {/* Login Sessions */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="font-semibold text-slate-900 mb-4">Active Sessions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-slate-900">Current Device</p>
                    <p className="text-sm text-slate-500">Chrome on MacOS • Lagos, Nigeria</p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Palette className="h-6 w-6 text-emerald-600" />
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Urbco looks</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 rounded-xl border-2 border-emerald-500 bg-slate-50">
              <div className="w-full h-20 rounded-lg bg-white mb-3 shadow-sm"></div>
              <p className="font-medium text-slate-900">Light</p>
            </button>
            <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300">
              <div className="w-full h-20 rounded-lg bg-slate-800 mb-3"></div>
              <p className="font-medium text-slate-900">Dark</p>
            </button>
            <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300">
              <div className="w-full h-20 rounded-lg bg-gradient-to-b from-white to-slate-800 mb-3"></div>
              <p className="font-medium text-slate-900">System</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Linked Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
          <CardDescription>Manage your connected payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">GT</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">GTBank •••• 1234</p>
                <p className="text-sm text-slate-500">Primary Account</p>
              </div>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" /> Add Bank Account
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Delete Account</p>
              <p className="text-sm text-slate-500">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
