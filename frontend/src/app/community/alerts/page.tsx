"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Navigation, Info, ShieldAlert, HeartPulse } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommunityAlerts() {
  const { villages, alerts, selectedCommunityVillageId, setSelectedCommunityVillageId } = useStore();
  const router = useRouter();

  const selectedVillage = villages.find(v => v.id === selectedCommunityVillageId);
  const villageAlerts = alerts.filter(a => a.villageId === selectedCommunityVillageId && a.status === 'ACTIVE');
  const nearestShelter = selectedVillage?.shelters?.[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Alerts</h1>
        <p className="text-slate-500">View important flash-flood and landslide warnings for your area.</p>
      </div>

      {/* MY AREA SELECTOR */}
      <Card className="border-blue-200 shadow-sm overflow-visible z-10 relative">
        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-blue-50/50">
          <MapPin className="text-blue-600 shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">My Area Alert Filter</h3>
            <p className="text-sm text-slate-600">Select your location to view specific warnings and guidance.</p>
          </div>
          <select 
            className="p-2 border rounded-md bg-white font-medium text-slate-800 w-full sm:w-auto min-w-[200px]"
            value={selectedCommunityVillageId || ''}
            onChange={(e) => setSelectedCommunityVillageId(e.target.value)}
          >
            {villages.map(v => (
              <option key={v.id} value={v.id}>{v.name}, {v.district}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* SELECTED LOCATION DETAILS */}
      {selectedVillage && (
        <Card className="border border-red-300 shadow-sm">
          <CardHeader className="bg-red-50/50 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-red-600 tracking-wider mb-1">{selectedVillage.combinedRisk} {selectedVillage.flashFloodRisk === 'CRITICAL' && selectedVillage.landslideRisk === 'CRITICAL' ? 'COMBINED' : selectedVillage.flashFloodRisk === 'CRITICAL' ? 'FLASH FLOOD' : 'LANDSLIDE'} RISK</p>
                <CardTitle className="text-xl">Your Area: {selectedVillage.name}</CardTitle>
                <p className="text-slate-600 text-sm">{selectedVillage.district}, Uttarakhand</p>
              </div>
              <Badge variant={selectedVillage.combinedRisk === 'CRITICAL' ? 'destructive' : selectedVillage.combinedRisk === 'HIGH' ? 'high' : 'warning'} className="text-sm py-1 px-3">
                {selectedVillage.combinedRisk}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
              <div className="p-4 space-y-1 bg-white">
                <p className="text-sm text-slate-500 font-medium">Early Warning Window:</p>
                <div className="font-bold text-lg text-red-600">{selectedVillage.warningWindow}</div>
                <p className="text-[10px] text-slate-400">Estimated potential lead time for preparedness and emergency response.</p>
              </div>
              <div className="p-4 space-y-1 bg-white">
                <p className="text-sm text-slate-500 font-medium">Hazard:</p>
                <p className="font-bold text-lg text-slate-800">
                  {selectedVillage.flashFloodRisk === 'CRITICAL' && selectedVillage.landslideRisk === 'CRITICAL' ? 'Flash Flood + Landslide' : 
                   selectedVillage.flashFloodRisk === 'CRITICAL' || selectedVillage.flashFloodRisk === 'HIGH' ? 'Flash Flood' : 'Landslide'}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-b">
              <p className="text-sm text-slate-500 font-medium mb-1">Current Situation:</p>
              <p className="text-slate-700">
                {selectedVillage.flashFloodRisk === 'CRITICAL' && selectedVillage.landslideRisk === 'CRITICAL' 
                  ? 'Rainfall and increasing soil moisture are contributing to both flash-flood and landslide risk.'
                  : selectedVillage.flashFloodRisk === 'CRITICAL' || selectedVillage.flashFloodRisk === 'HIGH'
                  ? 'Heavy rainfall and increasing soil saturation are contributing to elevated flash-flood risk.'
                  : 'Heavy rainfall and saturated ground conditions are increasing landslide risk.'}
              </p>
            </div>

            <div className="p-4 bg-red-50/30 border-b">
              <p className="text-sm text-slate-500 font-medium mb-1">Recommended Action:</p>
              <p className="text-lg font-bold text-red-700">
                {selectedVillage.combinedRisk === 'CRITICAL' ? 'PREPARE TO EVACUATE' : 
                 selectedVillage.combinedRisk === 'HIGH' ? 'Stay alert and be prepared to evacuate if conditions worsen.' :
                 'Stay away from unstable slopes and prepare to move to a safer location.'}
              </p>
            </div>

            {nearestShelter && (
              <div className="p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Nearest Shelter:</p>
                  <p className="font-bold text-slate-800">{nearestShelter.name} <span className="text-sm font-normal text-slate-500">({nearestShelter.distance} km)</span></p>
                </div>

              </div>
            )}

            <div className="p-4 bg-slate-100 flex flex-wrap gap-3">
              <Button onClick={() => router.push('/community/risk-map')} className="bg-blue-600 hover:bg-blue-700">View Safe Route</Button>
              <Button onClick={() => router.push('/community/risk-map')} variant="outline" className="bg-white">Find Nearest Shelter</Button>
              <Button onClick={() => router.push('/community/safety')} variant="outline" className="bg-white">Emergency Guidance</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ALL ACTIVE ALERTS */}
      <div className="pt-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-4">Other Critical Alerts in Uttarakhand</h2>
        <div className="grid md:grid-cols-2 gap-4">
          
          <Card className="border border-red-300 bg-red-50 shadow-sm">
            <CardHeader className="pb-2">
              <p className="text-xs font-bold text-red-600 tracking-wider mb-1">CRITICAL FLASH FLOOD RISK</p>
              <CardTitle className="text-lg">Rambara</CardTitle>
              <p className="text-xs text-slate-500">Rudraprayag, Uttarakhand</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-slate-600 mb-1">Early Warning Window:</p>
              <p className="font-bold text-red-600 mb-1">{villages.find(v => v.name === 'Rambara')?.warningWindow}</p>
              <p className="text-[10px] text-slate-400 mb-3">Estimated potential lead time for preparedness and emergency response.</p>
              <p className="text-sm text-slate-700 mb-3">Heavy rainfall and increasing soil saturation are contributing to elevated flash-flood risk.</p>
              <p className="text-sm font-bold text-red-700 mb-4">Recommended Action: PREPARE TO EVACUATE</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => { setSelectedCommunityVillageId('v2'); router.push('/community/risk-map'); }}>View Safe Route</Button>
                <Button size="sm" variant="outline" onClick={() => { setSelectedCommunityVillageId('v2'); router.push('/community/risk-map'); }}>Find Shelter</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-orange-300 bg-orange-50 shadow-sm">
            <CardHeader className="pb-2">
              <p className="text-xs font-bold text-orange-600 tracking-wider mb-1">HIGH COMBINED RISK</p>
              <CardTitle className="text-lg">Kalimath</CardTitle>
              <p className="text-xs text-slate-500">Rudraprayag, Uttarakhand</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-slate-600 mb-1">Early Warning Window:</p>
              <p className="font-bold text-red-600 mb-1">{villages.find(v => v.name === 'Kalimath')?.warningWindow}</p>
              <p className="text-[10px] text-slate-400 mb-3">Estimated potential lead time for preparedness and emergency response.</p>
              <p className="text-sm text-slate-700 mb-3">Rainfall and increasing soil moisture are contributing to both flash-flood and landslide risk.</p>
              <p className="text-sm font-bold text-orange-700 mb-4">Action: Stay alert and be prepared to evacuate if conditions worsen.</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => { setSelectedCommunityVillageId('v3'); router.push('/community/risk-map'); }}>View Safe Route</Button>
                <Button size="sm" variant="outline" onClick={() => router.push('/community/safety')}>Emergency Guidance</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ALERT LEVELS EXPLANATION */}
      <div className="pt-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-4">Understanding Alert Levels</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2 text-yellow-700 font-bold">
                <Info size={18} /> WATCH
              </div>
              <p className="text-sm text-yellow-900 mb-2 font-medium">Conditions are being monitored.</p>
              <p className="text-sm text-yellow-800"><span className="font-bold">Action:</span> Stay informed and remain prepared.</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold">
                <AlertTriangle size={18} /> WARNING
              </div>
              <p className="text-sm text-orange-900 mb-2 font-medium">Significant hazard conditions detected.</p>
              <p className="text-sm text-orange-800"><span className="font-bold">Action:</span> Prepare to move to a safer location.</p>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2 text-red-700 font-bold">
                <ShieldAlert size={18} /> CRITICAL
              </div>
              <p className="text-sm text-red-900 mb-2 font-medium">Immediate emergency preparedness required.</p>
              <p className="text-sm text-red-800"><span className="font-bold">Action:</span> Follow evacuation instructions and move to a safe location when instructed.</p>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}