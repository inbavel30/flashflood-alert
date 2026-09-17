"use client";
import RiskMap from "@/components/map/RiskMap";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";

export default function AuthorityRiskMap() {
  const { villages, alerts } = useStore();
  const criticalAreas = villages.filter(v => v.combinedRisk === 'CRITICAL').length;
  const highAreas = villages.filter(v => v.combinedRisk === 'HIGH').length;
  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE').length;

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-4 pb-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Operational Risk Map</h1>
          <p className="text-slate-500">Monitor hyper-local flash-flood and landslide risk across vulnerable areas of Uttarakhand and identify affected communities, infrastructure, shelters, and safer routes.</p>
        </div>
              </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card><CardContent className="p-3 flex items-center gap-3"><Activity className="text-blue-500 h-5 w-5"/><div className="text-sm"><p className="text-slate-500 text-xs">System Status</p><p className="font-bold text-green-600">OPERATIONAL</p></div></CardContent></Card>
        <Card><CardContent className="p-3 flex items-center gap-3"><div className="text-sm"><p className="text-slate-500 text-xs">Active Alerts</p><p className="font-bold">{activeAlerts}</p></div></CardContent></Card>
        <Card className="bg-red-50 border-red-200"><CardContent className="p-3 flex items-center gap-3"><div className="text-sm"><p className="text-red-700 text-xs">Critical Areas</p><p className="font-bold text-red-900">{criticalAreas}</p></div></CardContent></Card>
        <Card className="bg-orange-50 border-orange-200"><CardContent className="p-3 flex items-center gap-3"><div className="text-sm"><p className="text-orange-700 text-xs">High-Risk Areas</p><p className="font-bold text-orange-900">{highAreas}</p></div></CardContent></Card>
        <Card><CardContent className="p-3 flex items-center gap-3"><div className="text-sm"><p className="text-slate-500 text-xs">Last Update</p><p className="font-bold">09:42 AM</p></div></CardContent></Card>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search village, shelter, route..."
            className="w-full pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter size={16} /> Filters
        </Button>
      </div>

      <div className="flex-1 bg-slate-50 border rounded-xl relative overflow-hidden shadow-sm">
        <Suspense fallback={<div className="h-full w-full flex items-center justify-center bg-slate-100">Loading map...</div>}>
          <RiskMap role="EMERGENCY_AUTHORITY" />
        </Suspense>
      </div>
    </div>
  );
}