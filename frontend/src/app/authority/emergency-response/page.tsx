"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Truck, Route, Home, AlertTriangle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function EmergencyResponseContent() {
  const { villages, updateVillageResponseStatus } = useStore();
  const searchParams = useSearchParams();
  const locationQuery = searchParams.get('location');

  const [filterVillage, setFilterVillage] = useState<string | null>(null);

  useEffect(() => {
    if (locationQuery) {
      const found = villages.find(v => v.name.toLowerCase() === locationQuery.toLowerCase());
      if (found) {
        setFilterVillage(found.id);
      }
    } else {
      setFilterVillage(null);
    }
  }, [locationQuery, villages]);

  const criticalPriorities = villages.filter(v => v.combinedRisk === 'CRITICAL' && (!filterVillage || v.id === filterVillage));
  const highPriorities = villages.filter(v => v.combinedRisk === 'HIGH' && (!filterVillage || v.id === filterVillage));
  
  const totalPop = villages.reduce((sum, v) => sum + v.population, 0);
  const activeResponses = villages.filter(v => ['Action Required', 'Evacuation Prepared', 'Evacuation Active'].includes(v.responseStatus)).length;
  const totalShelters = villages.reduce((sum, v) => sum + v.shelters.length, 0);
  const totalRoutes = villages.reduce((sum, v) => sum + v.infrastructure.roads, 0);

  const ResponseControls = ({ village, showPriority = true }: { village: any, showPriority?: boolean }) => {
    let hazardText = '';
    if (village.flashFloodRisk === 'CRITICAL' && village.landslideRisk === 'CRITICAL') hazardText = 'Flood + Landslide';
    else if (village.flashFloodRisk === 'CRITICAL' || village.flashFloodRisk === 'HIGH') hazardText = 'Flash Flood';
    else if (village.landslideRisk === 'CRITICAL' || village.landslideRisk === 'HIGH') hazardText = 'Landslide';
    else hazardText = 'Flood';

    return (
      <Card className={village.combinedRisk === 'CRITICAL' ? 'border-red-300 bg-red-50/20' : 'border-orange-200 bg-orange-50/20'}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{village.name}</h3>
                <Badge variant={village.combinedRisk === 'CRITICAL' ? 'destructive' : 'high'}>{village.combinedRisk}</Badge>
                <Badge variant="outline">{hazardText}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-600 mt-4">
                <div className="flex items-center gap-2"><Users size={16} /> Population: <span className="font-bold text-slate-900">{village.population}</span></div>
                <div className="flex items-center gap-2 font-bold text-red-600"><AlertTriangle size={16} /> Early Warning Window: {village.warningWindow}</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border min-w-[280px]">
              <p className="text-sm font-bold text-slate-800 mb-3">Evacuation Controls</p>
              
              <div className="space-y-2">
                <Button 
                  className={`w-full justify-start ${village.responseStatus === 'Evacuation Prepared' ? 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200' : ''}`}
                  variant={village.responseStatus === 'Evacuation Prepared' ? 'outline' : 'outline'}
                  onClick={() => updateVillageResponseStatus(village.id, 'Evacuation Prepared')}
                >
                  <Route size={16} className="mr-2" /> 1. Prepare Safe Routes
                </Button>
                
                <Button 
                  className={`w-full justify-start ${village.responseStatus === 'Evacuation Active' ? 'bg-red-600 text-white hover:bg-red-700' : ''}`}
                  variant={village.responseStatus === 'Evacuation Active' ? 'default' : 'outline'}
                  onClick={() => updateVillageResponseStatus(village.id, 'Evacuation Active')}
                >
                  <AlertTriangle size={16} className="mr-2" /> 2. Order Evacuation
                </Button>
                
                <Button 
                  className={`w-full justify-start ${village.responseStatus === 'Resolved' ? 'bg-green-600 text-white hover:bg-green-700' : ''}`}
                  variant={village.responseStatus === 'Resolved' ? 'default' : 'outline'}
                  onClick={() => updateVillageResponseStatus(village.id, 'Resolved')}
                >
                  <Home size={16} className="mr-2" /> 3. Confirm Resolved
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Emergency Response</h1>
          <p className="text-slate-500">Prioritize emergency actions based on hazard severity, affected population, warning window, infrastructure exposure, and evacuation requirements.</p>
        </div>
              </div>

      <div className="grid gap-4 md:grid-cols-6">
        <Card className="bg-red-50 border-red-200"><CardContent className="p-4"><p className="text-xs font-medium text-red-800">Critical Priorities</p><h3 className="text-2xl font-bold text-red-900">{criticalPriorities.length}</h3></CardContent></Card>
        <Card className="bg-orange-50 border-orange-200"><CardContent className="p-4"><p className="text-xs font-medium text-orange-800">High Priorities</p><h3 className="text-2xl font-bold text-orange-900">{highPriorities.length}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">People Exposed</p><h3 className="text-2xl font-bold">18,450</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Active Responses</p><h3 className="text-2xl font-bold">{activeResponses}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Shelters Available</p><h3 className="text-2xl font-bold">12</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Attention Routes</p><h3 className="text-2xl font-bold">8</h3></CardContent></Card>
      </div>

      <div>
        <h2 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> PRIORITY 1 — CRITICAL</h2>
        <div className="grid gap-4">
          {criticalPriorities.map(v => <ResponseControls key={v.id} village={v} />)}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-orange-700 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> PRIORITY 2 — HIGH</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {highPriorities.map(v => <ResponseControls key={v.id} village={v} showPriority={false} />)}
        </div>
      </div>
    </div>
  );
}
export default function EmergencyResponse() {
  return (
    <Suspense fallback={<div className="p-8 text-center animate-pulse">Loading response data...</div>}>
      <EmergencyResponseContent />
    </Suspense>
  );
}
