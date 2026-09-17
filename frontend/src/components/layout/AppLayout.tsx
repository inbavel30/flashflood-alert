import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, AlertTriangle, FileText, Home, Map, Settings, ShieldAlert, FileWarning, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/risk-ai', label: 'Risk & AI', icon: Activity },
  { href: '/admin/risk-map', label: 'Risk Map', icon: Map },
  { href: '/admin/sensors-data', label: 'Sensors & Data', icon: BarChart },
  { href: '/admin/affected-areas', label: 'Affected Areas', icon: AlertTriangle },
  { href: '/admin/alerts', label: 'Alerts & History', icon: ShieldAlert },
  { href: '/admin/field-reports', label: 'Field Reports', icon: FileText },
  { href: '/admin/model-validation', label: 'Model Validation', icon: FileWarning },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const authorityLinks = [
  { href: '/authority/dashboard', label: 'Dashboard', icon: Home },
  { href: '/authority/risk-map', label: 'Risk Map', icon: Map },
  { href: '/authority/emergency-response', label: 'Emergency Response', icon: Activity },
  { href: '/authority/affected-areas', label: 'Affected Areas', icon: AlertTriangle },
  { href: '/authority/cascade-analysis', label: 'Cascade Analysis', icon: BarChart },
  { href: '/authority/alerts', label: 'Alerts', icon: ShieldAlert },
  { href: '/authority/field-reports', label: 'Field Reports', icon: FileText },
  { href: '/authority/history', label: 'History', icon: FileWarning },
];

import { GlobalHeader } from './GlobalHeader';

export function AppLayout({ children, role }: { children: React.ReactNode, role: 'ADMIN' | 'AUTHORITY' }) {
  const pathname = usePathname();
  const links = role === 'ADMIN' ? adminLinks : authorityLinks;
  const setRole = useStore(state => state.setRole);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      {/* Global Unified Header */}
      <GlobalHeader />
      
      <div className="flex flex-1 w-full max-w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-slate-900 border-r border-slate-200 flex flex-col shrink-0 sticky top-[64px] xl:top-[80px] h-[calc(100vh-64px)] xl:h-[calc(100vh-80px)] z-40 hidden md:flex">
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] transition-colors font-medium",
                    isActive ? "bg-slate-100 text-slate-900 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-slate-900" : "text-slate-500"} />
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-slate-200">
            <Link href="/login" onClick={() => setRole(null)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              Logout
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">

          <div className="flex-1 overflow-auto bg-slate-50/50">
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
