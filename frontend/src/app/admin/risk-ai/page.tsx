"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/store/useStore";

export default function RiskAndAI() {
  const villages = useStore(state => state.villages);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Risk & AI Analysis</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Flash Flood Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
               <div className="text-4xl font-bold text-orange-600">HIGH</div>
               <div className="text-sm text-slate-500">Confidence: 87%</div>
            </div>
            
            <h4 className="font-semibold text-slate-800 mb-3">Contributing Factors</h4>
            <div className="space-y-3 text-sm">
               <div className="flex justify-between items-center">
                 <span>Rainfall</span>
                 <span className="font-semibold text-red-600">HIGH</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Soil Moisture</span>
                 <span className="font-semibold text-orange-600">HIGH</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Terrain</span>
                 <span className="font-semibold text-yellow-600">MODERATE</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Runoff</span>
                 <span className="font-semibold text-orange-600">HIGH</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Historical Events</span>
                 <span className="font-semibold text-yellow-600">MODERATE</span>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Landslide Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
               <div className="text-4xl font-bold text-yellow-600">MODERATE</div>
               <div className="text-sm text-slate-500">Confidence: 92%</div>
            </div>
            
            <h4 className="font-semibold text-slate-800 mb-3">Contributing Factors</h4>
            <div className="space-y-3 text-sm">
               <div className="flex justify-between items-center">
                 <span>Rainfall</span>
                 <span className="font-semibold text-red-600">HIGH</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Soil Saturation</span>
                 <span className="font-semibold text-orange-600">HIGH</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Slope</span>
                 <span className="font-semibold text-red-600">HIGH</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Tilt</span>
                 <span className="font-semibold text-yellow-600">MODERATE</span>
               </div>
               <div className="flex justify-between items-center">
                 <span>Historical Susceptibility</span>
                 <span className="font-semibold text-yellow-600">MODERATE</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-500/50 bg-red-50/20">
         <CardHeader>
           <CardTitle>Combined Risk Analysis</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Overall Risk</div>
                <div className="text-4xl font-black text-red-600">CRITICAL</div>
              </div>
              
              <div className="flex-1 bg-white p-4 rounded-lg border">
                 <p className="text-slate-700 font-medium mb-2">Cascade Condition Detected</p>
                 <p className="text-sm text-slate-600">
                   Heavy rainfall and saturated slope conditions indicate simultaneous flood and landslide risk. 
                   Potential landslide debris threatens to block drainage routes, rapidly increasing downstream flash flood severity.
                 </p>
              </div>

              <div className="bg-white p-4 rounded-lg border min-w-[200px]">
                 <p className="text-sm text-slate-500 mb-1">Early Warning Window</p>
                 <p className="text-2xl font-bold text-red-600">{villages[0].warningWindow}</p>
                 <p className="text-[10px] text-slate-400 mt-2 leading-tight">Potential lead time depends on hazard conditions, weather information, sensor observations, terrain characteristics, and data availability.</p>
              </div>
           </div>
         </CardContent>
      </Card>
    </div>
  );
}
