"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Bell, User, Settings, LogOut, Activity, Database, CloudRain, Map as MapIcon, Radio } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function GlobalHeader() {
  const router = useRouter();
  const setRole = useStore(state => state.setRole);
  const role = useStore(state => state.role);

  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const sysRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setRole(null);
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    router.push('/login');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sysRef.current && !sysRef.current.contains(event.target as Node)) setIsSystemMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifMenuOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileMenuOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSystemMenuOpen(false);
        setIsNotifMenuOpen(false);
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentDate = mounted ? new Date().toLocaleString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace('AM', 'am').replace('PM', 'pm') : '';

  return (
    <header className="bg-white border-b sticky top-0 z-50 w-full shrink-0 shadow-sm">
      <div className="w-full px-4 sm:px-6 min-h-[64px] py-3 xl:py-2 xl:min-h-[80px] flex flex-col xl:flex-row items-center justify-between gap-3 xl:gap-6">
        
        {/* Row 1 for Mobile / App Title & MHA Logo on left side for desktop */}
        <div className="flex items-center justify-between w-full xl:w-auto shrink-0">
          <Link href={role === 'ADMIN' ? '/admin/dashboard' : role === 'EMERGENCY_AUTHORITY' ? '/authority/dashboard' : '/community/risk-map'} className="flex items-center gap-3">
            <img 
              src="/flashflood-logo.png" 
              alt="FlashFlood Alert AI Logo" 
              className="h-8 sm:h-10 w-auto object-contain" 
            />
            <span className="text-lg sm:text-xl font-bold text-slate-900 whitespace-nowrap">FlashFlood Alert AI</span>
          </Link>
          {/* MHA Logo Mobile */}
          <a 
            href="https://www.mha.gov.in/en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex xl:hidden items-center justify-center shrink-0 hover:opacity-90 transition-opacity w-12 h-12"
          >
            <img 
              src="/mha-logo.png" 
              alt="Ministry of Home Affairs Logo"
              className="object-contain w-full h-full scale-[1.5] transform origin-center"
            />
          </a>
        </div>

        {/* Center: Government Information Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[13px] font-medium leading-none text-slate-800 flex-1 px-4">
          <a 
            href="https://www.mha.gov.in/en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-[6px] uppercase hover:underline cursor-pointer"
          >
            <span>MINISTRY OF HOME AFFAIRS</span>
            <img src="/chain-icon.png" alt="" className="w-3.5 h-3.5 object-contain" style={{ textDecoration: 'none' }} />
          </a>
          <span className="text-slate-300 font-normal">&bull;</span>
          <a 
            href="https://www.ndrf.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-[6px] hover:underline cursor-pointer"
          >
            <span>National Disaster Response Force (NDRF)</span>
            <img src="/chain-icon.png" alt="" className="w-3.5 h-3.5 object-contain" style={{ textDecoration: 'none' }} />
          </a>
          
          <span className="text-slate-300 font-normal">&bull;</span>
          
          <a 
            href="https://www.mha.gov.in/en/divisionofmha/disaster-management-division" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-[6px] hover:underline cursor-pointer"
          >
            <span>Disaster Management Division</span>
            <img src="/chain-icon.png" alt="" className="w-3.5 h-3.5 object-contain" style={{ textDecoration: 'none' }} />
          </a>
        </div>

        {/* Right Side: Status, Notifications, Profile, Logo */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-end gap-4 shrink-0 w-full xl:w-auto">
          
          {/* Current Date & Time */}
          <div className="text-[13px] font-medium text-slate-600 whitespace-nowrap">
            {currentDate}
          </div>

          {/* System Online Indicator */}
          <div className="relative" ref={sysRef}>
            <Button variant="ghost" size="sm" onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)} className="flex items-center gap-1.5 px-2 h-auto py-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[13px] font-medium text-slate-700">System Online</span>
            </Button>
            {isSystemMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-lg rounded-md p-2 z-50">
                <div className="px-2 py-1.5 text-sm font-semibold text-slate-900">System Health</div>
                <div className="h-px bg-slate-100 my-1"></div>
                <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-700"><Radio size={16} /> IoT Network</div>
                  <span className="text-xs font-semibold text-green-600">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CloudRain size={16} /> Weather Data</div>
                  <span className="text-xs font-semibold text-green-600">LIVE</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-700"><MapIcon size={16} /> GIS Data</div>
                  <span className="text-xs font-semibold text-green-600">LIVE</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-700"><Database size={16} /> Database</div>
                  <span className="text-xs font-semibold text-green-600">CONNECTED</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center gap-2 text-sm text-slate-700"><Activity size={16} /> LoRa</div>
                  <span className="text-xs font-semibold text-green-600">ACTIVE</span>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <Button variant="ghost" size="icon" onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)} className="relative h-8 w-8">
              <Bell size={18} className="text-slate-700" />
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                6
              </span>
            </Button>
            {isNotifMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 shadow-lg rounded-md p-2 z-50">
                <div className="px-2 py-1.5 text-sm font-semibold text-slate-900">Active Alerts</div>
                <div className="h-px bg-slate-100 my-1"></div>
                <div className="px-2 py-2 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-sm font-semibold text-red-600">CRITICAL: Flash Flood</span>
                    <span className="text-xs text-slate-500">2m ago</span>
                  </div>
                  <span className="text-xs text-slate-700">Rambara - Water levels rising rapidly.</span>
                </div>
                <div className="h-px bg-slate-100 my-1"></div>
                <div className="px-2 py-2 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-sm font-semibold text-orange-600">HIGH: Landslide</span>
                    <span className="text-xs text-slate-500">15m ago</span>
                  </div>
                  <span className="text-xs text-slate-700">Gaurikund - High soil moisture detected.</span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Logout */}
          {role !== 'ADMIN' && role !== 'EMERGENCY_AUTHORITY' ? (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2 px-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium">
              <LogOut size={16} />
              <span className="text-[13px]">Logout</span>
            </Button>
          ) : (
            <div className="relative" ref={profileRef}>
              <Button variant="ghost" size="sm" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2 px-2 h-auto py-1">
                <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <User size={14} className="text-slate-600" />
                </div>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[13px] font-semibold text-slate-900 leading-none">
                    {role === 'EMERGENCY_AUTHORITY' ? 'Authority' : 'Admin'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-normal leading-none mt-1">
                    {role === 'EMERGENCY_AUTHORITY' ? 'Emergency Authority' : 'Administrator'}
                  </span>
                </div>
              </Button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-lg rounded-md p-2 z-50">
                  <div className="px-2 py-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">My Account</div>
                    <div className="text-sm font-medium text-slate-900">
                      {role === 'EMERGENCY_AUTHORITY' ? 'Emergency Authority' : 'Administrator'}
                    </div>
                  </div>
                  <div className="h-px bg-slate-100 my-1"></div>
                  
                  <Link href={role === 'ADMIN' ? '/admin/profile' : '/authority/profile'} className="flex items-center px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-sm cursor-pointer transition-colors" onClick={() => setIsProfileMenuOpen(false)}>
                    <User className="mr-3 h-4 w-4" /> Profile
                  </Link>
                  
                  <Link href={role === 'ADMIN' ? '/admin/settings' : '/authority/settings'} className="flex items-center px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-sm cursor-pointer transition-colors" onClick={() => setIsProfileMenuOpen(false)}>
                    <Settings className="mr-3 h-4 w-4" /> Settings
                  </Link>
                  
                  <div className="h-px bg-slate-100 my-1"></div>
                  
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-sm cursor-pointer transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MHA Logo Desktop */}
          <a 
            href="https://www.mha.gov.in/en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden xl:flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity ml-4 w-16 h-16"
          >
            <img 
              src="/mha-logo.png" 
              alt="Ministry of Home Affairs Logo"
              className="object-contain w-full h-full scale-[1.7] transform origin-center"
            />
          </a>

        </div>
      </div>
    </header>
  );
}
