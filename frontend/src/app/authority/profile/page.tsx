"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield } from "lucide-react";

export default function AuthorityProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="text-slate-500">Manage your account information and preferences.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-slate-500" />
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-500">Name</span>
            <span className="text-sm font-semibold text-slate-900">Emergency Authority</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-500">Role</span>
            <span className="text-sm font-semibold text-slate-900">Emergency Authority</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-slate-500">Access</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
              <Shield className="h-3 w-3" />
              Authority Portal
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
