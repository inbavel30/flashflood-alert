"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, CloudRain, Map as MapIcon, History, Radio } from "lucide-react";
import { useState } from "react";

export default function SensorsData() {
  const { sensors, villages } = useStore();
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

  const getVillageName = (id: string) => villages.find(v => v.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sensors & Data</h1>
          <p className="text-slate-500">Monitor IoT sensor conditions, environmental measurements, weather inputs, terrain information, and communication status supporting the early-warning system.</p>
        </div>
              </div>

      {/* System Data Status */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <Radio className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-xs font-medium text-slate-500">IoT Sensor Network</p>
            <p className="text-sm font-bold text-green-600">LIVE</p>
            <p className="text-[10px] text-slate-400 mt-1">Last Update: 09:42 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CloudRain className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-xs font-medium text-slate-500">Weather Data</p>
            <p className="text-sm font-bold text-green-600">LIVE</p>
            <p className="text-[10px] text-slate-400 mt-1">Last Update: 09:41 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <MapIcon className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-xs font-medium text-slate-500">GIS Data</p>
            <p className="text-sm font-bold text-green-600">LIVE</p>
            <p className="text-[10px] text-slate-400 mt-1">Last Update: 09:40 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <MapIcon className="h-6 w-6 text-slate-400 mb-2" />
            <p className="text-xs font-medium text-slate-500">DEM / Terrain</p>
            <p className="text-sm font-bold text-slate-600">AVAILABLE</p>
            <p className="text-[10px] text-slate-400 mt-1">Last Update: Updated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <History className="h-6 w-6 text-slate-400 mb-2" />
            <p className="text-xs font-medium text-slate-500">Historical Disaster Data</p>
            <p className="text-sm font-bold text-slate-600">AVAILABLE</p>
            <p className="text-[10px] text-slate-400 mt-1">Last Update: Updated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Database className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-xs font-medium text-slate-500">Database & LoRa</p>
            <p className="text-sm font-bold text-green-600">CONNECTED / ACTIVE</p>
            <p className="text-[10px] text-slate-400 mt-1">Last Update: 09:42 AM</p>
          </CardContent>
        </Card>
      </div>

      {/* IoT Summary */}
      <Card>
        <CardContent className="p-4 flex flex-wrap gap-8 items-center bg-slate-50 border-slate-200">
           <div><span className="text-slate-500 text-sm">Total Nodes:</span> <span className="font-bold">27</span></div>
           <div><span className="text-slate-500 text-sm">Nodes Online:</span> <span className="font-bold text-green-600">24</span></div>
           <div><span className="text-slate-500 text-sm">Nodes Offline:</span> <span className="font-bold text-red-600">3</span></div>
           <div><span className="text-slate-500 text-sm">Last Sensor Update:</span> <span className="font-bold">09:42 AM</span></div>
           <div><span className="text-slate-500 text-sm">LoRa Network:</span> <Badge variant="success">ACTIVE</Badge></div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-lg">IoT Sensor Network (Prototype Scenario)</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-y text-slate-600">
              <tr>
                <th className="px-4 py-3">Node</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Rainfall</th>
                <th className="px-4 py-3">Soil Moisture</th>
                <th className="px-4 py-3">Tilt</th>
                <th className="px-4 py-3">Environment</th>
                <th className="px-4 py-3">Battery</th>
                <th className="px-4 py-3">Last Update</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((s) => (
                <tr key={s.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSensor(s.id)}>
                  <td className="px-4 py-3 font-medium">{s.node}</td>
                  <td className="px-4 py-3">{getVillageName(s.villageId)}</td>
                  <td className="px-4 py-3">{s.rainfall} mm/hr</td>
                  <td className="px-4 py-3">{s.soilMoisture}%</td>
                  <td className="px-4 py-3">{s.tilt}°</td>
                  <td className="px-4 py-3">{s.environment}</td>
                  <td className="px-4 py-3">{s.battery}%</td>
                  <td className="px-4 py-3 text-xs">{s.lastUpdate}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.status === 'ONLINE' ? 'success' : 'destructive'}>{s.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* External Data Overview */}
      <div className="grid md:grid-cols-2 gap-6">
         <Card>
           <CardHeader><CardTitle className="text-base">Weather & GIS Data</CardTitle></CardHeader>
           <CardContent className="text-sm space-y-2 text-slate-600">
             <div className="flex justify-between border-b pb-1"><span>Rainfall Intensity</span><span className="font-medium text-slate-900">Heavy</span></div>
             <div className="flex justify-between border-b pb-1"><span>Forecast</span><span className="font-medium text-slate-900">Continuous rain next 4 hrs</span></div>
             <div className="flex justify-between border-b pb-1"><span>Village Boundaries</span><span className="font-medium text-slate-900">Loaded</span></div>
             <div className="flex justify-between"><span>Critical Infrastructure</span><span className="font-medium text-slate-900">Mapped</span></div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader><CardTitle className="text-base">Terrain & Historical</CardTitle></CardHeader>
           <CardContent className="text-sm space-y-2 text-slate-600">
             <div className="flex justify-between border-b pb-1"><span>Elevation / Slope</span><span className="font-medium text-slate-900">High Resolution</span></div>
             <div className="flex justify-between border-b pb-1"><span>Drainage Direction</span><span className="font-medium text-slate-900">Mapped</span></div>
             <div className="flex justify-between border-b pb-1"><span>Previous Flood Events</span><span className="font-medium text-slate-900">2013, 2021 Data Linked</span></div>
             <div className="flex justify-between"><span>Historical Susceptibility</span><span className="font-medium text-slate-900">Included in AI Model</span></div>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}