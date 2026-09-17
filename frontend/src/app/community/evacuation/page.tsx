"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation, Home, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import CommunityEvacuationMap from "@/components/map/CommunityEvacuationMap";

export default function CommunityEvacuation() {
  const { villages, selectedCommunityVillageId } = useStore();
  const router = useRouter();
  
  const [highlightRoute, setHighlightRoute] = useState(false);
  const [shelterModalOpen, setShelterModalOpen] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const selectedVillage = villages.find(v => v.id === selectedCommunityVillageId) || villages[0];
  const shelters = selectedVillage?.shelters || [];
  const nearestShelter = shelters[0];
  const secondShelter = shelters[1] || { 
    id: 's-mock-2', name: 'Kedarnath Valley Relief Shelter', 
    capacity: 800, distance: 2.8, status: 'OPEN', routeStatus: 'MONITORING' 
  };

  const handleViewSafeRoute = () => {
    setHighlightRoute(true);
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Briefly pulse the route
    setTimeout(() => setHighlightRoute(false), 3000);
  };

  if (!selectedVillage) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Evacuation Guidance, Safe Routes and Shelters</h1>
        <p className="text-slate-500">Find the nearest safe shelter and follow the recommended route during a flood or landslide emergency.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: LOCATION & ROUTES */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          
          {/* YOUR LOCATION INFO */}
          <Card className="border border-red-300 bg-red-50 shadow-sm order-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg uppercase">Your Area: {selectedVillage.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">Current Risk:</p>
                <Badge variant={selectedVillage.combinedRisk === 'CRITICAL' ? 'destructive' : 'warning'} className="mt-1">{selectedVillage.combinedRisk}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Hazard:</p>
                <p className="font-bold text-slate-800">{selectedVillage.flashFloodRisk === 'CRITICAL' && selectedVillage.landslideRisk === 'CRITICAL' ? 'Flash Flood + Landslide' : 'Flash Flood'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Early Warning Window:</p>
                <div className="font-bold text-red-600">{selectedVillage.warningWindow}</div>
                <p className="text-[10px] text-slate-400">Estimated potential lead time for preparedness and emergency response.</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Recommended Action:</p>
                <p className="font-bold text-red-700 uppercase">{selectedVillage.combinedRisk === 'CRITICAL' ? 'PREPARE TO EVACUATE' : 'Stay alert and monitor updates'}</p>
              </div>
            </CardContent>
          </Card>

          {/* EVACUATION MAP / ROUTE VISUAL */}
          <Card className="shadow-sm overflow-hidden flex flex-col order-2" ref={mapSectionRef}>
            <div className="h-[360px] md:h-[450px] relative border-b w-full shrink-0">
              <CommunityEvacuationMap 
                village={selectedVillage} 
                highlightRoute={highlightRoute}
              />
            </div>
            
            <CardContent className="p-0">
              {/* RECOMMENDED ROUTE */}
              <div className="p-4 bg-green-50/50 border-b">
                <p className="text-xs font-bold text-green-700 tracking-wider mb-2">RECOMMENDED SAFE ROUTE</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm font-medium text-slate-700 uppercase">
                  <div className="bg-white px-3 py-1 rounded border shadow-sm">{selectedVillage.name}</div>
                  <span className="text-slate-400 hidden sm:block">→</span>
                  <div className="text-slate-400 sm:hidden ml-4">↓</div>
                  <div className="bg-white px-3 py-1 rounded border shadow-sm">Main Access Road</div>
                  <span className="text-slate-400 hidden sm:block">→</span>
                  <div className="text-slate-400 sm:hidden ml-4">↓</div>
                  <div className="bg-white px-3 py-1 rounded border shadow-sm border-green-300">{nearestShelter?.name || 'Community Relief Centre'}</div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-slate-500 font-medium">Route Status:</span>
                  <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">SAFE</Badge>
                </div>
              </div>

              {/* BLOCKED ROUTE */}
              <div className="p-4 bg-slate-50">
                <p className="text-xs font-bold text-slate-500 tracking-wider mb-2">AVOID THIS ROUTE</p>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 uppercase">
                  <span className="line-through">{selectedVillage.name}</span> → <span className="line-through">Lower Valley Road</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-500 font-medium">Status:</span> <Badge variant="destructive" className="ml-1 text-[10px]">BLOCKED</Badge>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Reason:</span> Potential landslide debris
                  </div>
                </div>
                <p className="text-sm font-bold text-red-600 mt-2">Recommended Action: Do not use this route. Follow the recommended safer route.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: SHELTERS & STEPS */}
        <div className="space-y-6 flex flex-col">
          
          {/* NEAREST SHELTER */}
          {nearestShelter && (
            <Card className="border border-green-300 shadow-sm order-3 lg:order-none">
              <CardHeader className="pb-2 bg-green-50/30">
                <p className="text-xs font-bold text-green-600 tracking-wider mb-1">NEAREST SAFE SHELTER</p>
                <CardTitle className="text-lg">{nearestShelter.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Distance:</span>
                  <span className="font-bold">{nearestShelter.distance} km</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Capacity:</span>
                  <span className="font-bold">{nearestShelter.capacity} people</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Current Status:</span>
                  <Badge variant="success">OPEN</Badge>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Route Status:</span>
                  <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">SAFE</Badge>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-500 font-medium">Estimated Travel Time:</span>
                  <span className="font-bold">15 minutes</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button size="sm" onClick={handleViewSafeRoute} className="bg-blue-600 hover:bg-blue-700 text-xs h-8">View Safe Route</Button>
                  <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${nearestShelter.lat},${nearestShelter.lng}`, '_blank')}>Get Directions</Button>
                  <Button size="sm" variant="secondary" className="col-span-2 text-xs h-8" onClick={() => setShelterModalOpen(true)}>Shelter Details</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SECOND SHELTER */}
          <Card className="shadow-sm order-4 lg:order-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{secondShelter.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Distance:</span>
                <span className="font-bold">{secondShelter.distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capacity:</span>
                <span className="font-bold">{secondShelter.capacity} people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-green-600">OPEN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route Status:</span>
                <span className="font-bold text-orange-500">MONITORING</span>
              </div>
              <div className="flex gap-2 pt-3">
                <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => router.push('/community/risk-map')}>View Route</Button>
                <Button size="sm" variant="secondary" className="flex-1 text-xs" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${secondShelter.distance ? 30.6 : 30.5},79.0`, '_blank')}>Get Directions</Button>
              </div>
            </CardContent>
          </Card>

          {/* EVACUATION STEPS */}
          <Card className="bg-slate-50 shadow-sm border-slate-200 order-5 lg:order-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Navigation size={18} className="text-blue-600"/> Evacuation Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 font-medium">
                <li>Stay calm and follow official instructions.</li>
                <li>Take essential medicines, documents, water and emergency supplies.</li>
                <li>Move away from rivers, streams and unstable slopes.</li>
                <li>Follow the marked safer route.</li>
                <li>Do not cross flowing water.</li>
                <li>Go to the nearest designated shelter.</li>
                <li>Stay at the shelter until authorities provide further instructions.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SHELTER DETAILS MODAL (Custom implementation to avoid shadcn dialog dependency if missing) */}
      {shelterModalOpen && nearestShelter && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center border-b p-4 bg-slate-50">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <Home className="h-5 w-5 text-green-600" /> 
                {nearestShelter.name}
              </h2>
              <button onClick={() => setShelterModalOpen(false)} className="p-1 hover:bg-slate-200 rounded transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500 font-medium">Status:</span>
                <Badge variant="success">OPEN</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500 font-medium">Capacity:</span>
                <span className="font-bold">{nearestShelter.capacity} people</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500 font-medium">Distance:</span>
                <span className="font-bold">{nearestShelter.distance} km</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500 font-medium">Route:</span>
                <span className="font-bold text-green-600">SAFE</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-slate-500 font-medium">Estimated Travel Time:</span>
                <span className="font-bold">15 minutes</span>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-100 mt-4">
                <p className="font-bold text-blue-800 mb-1">Recommended Action:</p>
                <p className="text-blue-900 font-medium">Follow the marked safer route and proceed to the designated shelter.</p>
              </div>
            </div>
            <div className="border-t p-4 bg-slate-50 flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => { setShelterModalOpen(false); handleViewSafeRoute(); }}>View Safe Route</Button>
              <Button className="flex-1" variant="outline" onClick={() => setShelterModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}