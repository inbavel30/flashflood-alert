"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function CascadeAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cascade Analysis</h1>
          <p className="text-slate-500">Understand how rainfall, soil saturation, slope instability, drainage blockage, and downstream flooding can interact across connected locations.</p>
        </div>
              </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Current Cascade Scenario</CardTitle></CardHeader>
            <CardContent>
               <div className="flex flex-col items-center max-w-md mx-auto space-y-2 py-4">
                  
                  <div className="w-full bg-blue-50 border border-blue-200 p-3 rounded-lg text-center shadow-sm">
                    <p className="text-xs font-bold text-blue-800 mb-1 uppercase tracking-wider">Upstream Condition</p>
                    <p className="font-semibold text-slate-800">Heavy Rainfall</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">Status: Increasing</p>
                  </div>
                  <ArrowDown className="text-slate-300" />
                  
                  <div className="w-full bg-orange-50 border border-orange-200 p-3 rounded-lg text-center shadow-sm">
                    <p className="text-xs font-bold text-orange-800 mb-1 uppercase tracking-wider">Ground Condition</p>
                    <p className="font-semibold text-slate-800">Soil Saturation</p>
                    <p className="text-xs text-orange-600 mt-1 font-medium">Status: High</p>
                  </div>
                  <ArrowDown className="text-slate-300" />

                  <div className="w-full bg-orange-50 border border-orange-200 p-3 rounded-lg text-center shadow-sm">
                    <p className="text-xs font-bold text-orange-800 mb-1 uppercase tracking-wider">Slope Condition</p>
                    <p className="font-semibold text-slate-800">Slope Instability</p>
                    <p className="text-xs text-orange-600 mt-1 font-medium">Status: Increasing</p>
                  </div>
                  <ArrowDown className="text-slate-300" />

                  <div className="w-full bg-red-50 border border-red-200 p-3 rounded-lg text-center shadow-sm relative">
                    <div className="absolute -right-2 -top-2"><Badge variant="destructive">CRITICAL</Badge></div>
                    <p className="text-xs font-bold text-red-800 mb-1 uppercase tracking-wider">Landslide Risk</p>
                    <p className="font-bold text-slate-900 text-lg">Tapovan / Lata</p>
                  </div>
                  <ArrowDown className="text-slate-300" />

                  <div className="w-full bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center shadow-sm">
                    <p className="text-xs font-bold text-yellow-800 mb-1 uppercase tracking-wider">Potential Blockage</p>
                    <p className="font-semibold text-slate-800">Drainage / Channel Blockage</p>
                    <p className="text-xs text-yellow-600 mt-1 font-medium">Status: Possible</p>
                  </div>
                  <ArrowDown className="text-slate-300" />

                  <div className="w-full bg-blue-50 border border-blue-200 p-3 rounded-lg text-center shadow-sm">
                    <p className="text-xs font-bold text-blue-800 mb-1 uppercase tracking-wider">Downstream Condition</p>
                    <p className="font-semibold text-slate-800">Water Accumulation</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">Status: Increasing</p>
                  </div>
                  <ArrowDown className="text-slate-300" />

                  <div className="w-full bg-red-50 border border-red-200 p-3 rounded-lg text-center shadow-sm relative">
                    <div className="absolute -right-2 -top-2"><Badge variant="destructive">CRITICAL</Badge></div>
                    <p className="text-xs font-bold text-red-800 mb-1 uppercase tracking-wider">Flash Flood Risk</p>
                    <p className="font-bold text-slate-900 text-lg">Rambara / Gaurikund</p>
                  </div>

               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Cascade Impact</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1">Primary Hazard</p>
                  <p className="font-medium text-slate-800">Landslide</p>
               </div>
               <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1">Secondary Hazard</p>
                  <p className="font-medium text-slate-800">Potential drainage obstruction</p>
               </div>
               <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1">Downstream Hazard</p>
                  <p className="font-medium text-slate-800">Flash Flood</p>
               </div>
               
               <div className="pt-2 border-t mt-4">
                  <p className="text-xs text-slate-500 font-semibold mb-2">Potential Impact</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    <li>Road blockage</li>
                    <li>Bridge access disruption</li>
                    <li>Localized flooding</li>
                    <li>Evacuation route disruption</li>
                    <li>Increased downstream exposure</li>
                  </ul>
               </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader><CardTitle className="text-lg">Authority Actions</CardTitle></CardHeader>
             <CardContent className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start">Monitor Upstream</Button>
                <Button variant="outline" className="justify-start">Inspect Critical Route</Button>
                <Button variant="outline" className="justify-start border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">Prepare Downstream Evacuation</Button>
                <Button variant="outline" className="justify-start">Check Shelter Readiness</Button>
                <Button variant="outline" className="justify-start border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800">Issue Warning</Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
