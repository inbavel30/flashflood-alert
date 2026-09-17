"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Bell, Shield, Smartphone } from "lucide-react";

export default function AuthoritySettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500">Configure your system preferences and notification settings.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-slate-500" />
              Notifications
            </CardTitle>
            <p className="text-sm text-slate-500">Manage how you receive critical alerts and updates.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Critical Alerts Push Notifications</span>
                <span className="text-xs text-slate-500">Receive instant push notifications for CRITICAL risk events.</span>
              </div>
              <div className="h-5 w-9 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">SMS Fallback</span>
                <span className="text-xs text-slate-500">Send SMS when network is unreachable.</span>
              </div>
              <div className="h-5 w-9 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-slate-500" />
              Security
            </CardTitle>
            <p className="text-sm text-slate-500">Manage your authentication and security preferences.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Two-Factor Authentication</span>
                <span className="text-xs text-slate-500">Require 2FA for all portal logins.</span>
              </div>
              <div className="h-5 w-9 bg-slate-200 rounded-full relative cursor-not-allowed">
                <div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
