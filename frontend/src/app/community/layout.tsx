"use client";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Map, MapPin, Bell, Navigation, ShieldCheck, Users } from "lucide-react";

const communityLinks = [
  { href: '/community/risk-map', label: 'Risk Map', icon: Map },
  { href: '/community/my-area', label: 'My Area', icon: MapPin },
  { href: '/community/alerts', label: 'Alerts', icon: Bell },
  { href: '/community/evacuation', label: 'Evacuation', icon: Navigation },
  { href: '/community/safety', label: 'Safety & Preparedness', icon: ShieldCheck },
];

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const role = useStore(state => state.role);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not authenticated, default to PUBLIC for the community portal
    if (!role) {
      // We don't redirect here, just allow them to view it as public
    }
  }, [role]);

  return (
    <PublicLayout>
      <div className="grid md:grid-cols-[240px_minmax(0,1fr)] gap-6 w-full max-w-none items-start">
        <aside className="w-full flex flex-col gap-4">
          <div className="hidden md:block px-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              Community Access
            </h2>
            <p className="text-xs text-slate-500 font-medium">Stay Informed • Stay Safe</p>
          </div>
          <nav className="flex md:flex-col gap-2.5 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {communityLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "flex items-center justify-start gap-3 px-4 h-14 rounded-lg text-[14px] font-medium transition-all duration-200 shrink-0 md:w-full w-auto border shadow-sm",
                    isActive 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-slate-500 shrink-0"} />
                  <span className="leading-none mt-0.5 text-left whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 w-full bg-transparent">
          {children}
        </div>
      </div>
    </PublicLayout>
  );
}
