"use client";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Users, MapPin, ShieldAlert, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AuthorityDashboard() {
  const { villages, alerts } = useStore();
  
  const criticalVillages = villages.filter(v => v.combinedRisk === 'CRITICAL').length;
  const highRiskVillages = villages.filter(v => v.combinedRisk === 'HIGH').length;
  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE').length;
  const totalPop = villages.reduce((acc, v) => acc + v.population, 0);
  const totalInfra = villages.reduce((acc, v) => acc + v.infrastructure.roads + v.infrastructure.bridges + v.infrastructure.schools + v.infrastructure.hospitals, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Current Emergency Situation</h1>
          <p className="text-slate-500">Real-time overview of hazard exposure and emergency readiness.</p>
        </div>
              </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Critical Areas</p>
              <h3 className="text-2xl font-bold text-red-900">{criticalVillages}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-orange-800">High Risk Areas</p>
              <h3 className="text-2xl font-bold text-orange-900">{highRiskVillages}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <ShieldAlert className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
              <h3 className="text-2xl font-bold">{activeAlerts}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">People Exposed</p>
              <h3 className="text-2xl font-bold">{totalPop.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <MapPin className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Infrastructure</p>
              <h3 className="text-2xl font-bold">{totalInfra}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         {/* Top Priorities */}
         <Card className="border-red-500/50">
           <CardHeader className="bg-red-50/50 border-b border-red-100">
             <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="text-red-500 h-5 w-5" /> 
                Highest Risk Area: Gaurikund
             </CardTitle>
           </CardHeader>
           <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between border-b pb-2 text-sm">
                <span className="text-slate-500">Hazard</span>
                <span className="font-semibold">Flash Flood & Landslide</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-sm">
                <span className="text-slate-500">Early Warning Window</span>
                <div className="text-right">
                   <span className="font-bold text-red-600 block">{villages.find(v => v.name === 'Gaurikund')?.warningWindow}</span>
                   <span className="text-[10px] text-slate-400">Potential lead time for preparedness.</span>
                </div>
              </div>
              <div className="flex justify-between border-b pb-2 text-sm">
                <span className="text-slate-500">Response Status</span>
                <span className="font-semibold text-red-600">ACTION REQUIRED</span>
              </div>
           </CardContent>
         </Card>

         <Card>
           <CardHeader>
             <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Latest Cascade Warnings
             </CardTitle>
           </CardHeader>
           <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                   <p className="font-semibold text-red-800 text-sm">Upstream Soil Saturation</p>
                   <p className="text-xs text-red-700 mt-1">Increases downstream flood risk by 45% in Gaurikund and Rambara.</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-100 rounded-md">
                   <p className="font-semibold text-orange-800 text-sm">Potential Drainage Blockage</p>
                   <p className="text-xs text-orange-700 mt-1">Landslide detected near primary drainage route. Monitoring high flood risk.</p>
                </div>
              </div>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}
