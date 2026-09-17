"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, AlertTriangle, MapPin, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AffectedAreasContent() {
  const { villages } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locationQuery = searchParams.get('location');
  
  const [selectedVillageId, setSelectedVillageId] = useState<string | null>(null);

  useEffect(() => {
    if (locationQuery) {
      const found = villages.find(v => v.name.toLowerCase() === locationQuery.toLowerCase());
      if (found) {
        setSelectedVillageId(found.id);
      }
    }
  }, [locationQuery, villages]);

  const criticalAreas = villages.filter(v => v.combinedRisk === 'CRITICAL').length;
  const highAreas = villages.filter(v => v.combinedRisk === 'HIGH').length;
  const modAreas = villages.filter(v => v.combinedRisk === 'MODERATE').length;
  const totalPop = villages.reduce((acc, v) => acc + v.population, 0);
  const totalInfra = villages.reduce((acc, v) => acc + v.infrastructure.roads + v.infrastructure.bridges + v.infrastructure.schools + v.infrastructure.hospitals, 0);

  const selectedVillage = villages.find(v => v.id === selectedVillageId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Affected Areas</h1>
          <p className="text-slate-500">Identify villages and critical infrastructure exposed to flash-flood, landslide, and combined hazard conditions.</p>
        </div>
        
      </div>

      {selectedVillage ? (
        <Card className="border-blue-300 shadow-md">
          <CardHeader className="bg-blue-50/50 border-b flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="text-blue-600" /> {selectedVillage.name}
              </CardTitle>
              <p className="text-slate-500 text-sm mt-1">{selectedVillage.district}, Uttarakhand</p>
            </div>
            <button onClick={() => {
              setSelectedVillageId(null);
              router.push('/authority/affected-areas');
            }} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Risk Level</p>
                <Badge variant={selectedVillage.combinedRisk === 'CRITICAL' ? 'destructive' : 'high'}>{selectedVillage.combinedRisk}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Hazard</p>
                <p className="font-bold">{selectedVillage.flashFloodRisk === 'CRITICAL' && selectedVillage.landslideRisk === 'CRITICAL' ? 'Flood + Landslide' : 'Flash Flood'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Early Warning Window</p>
                <p className="font-bold text-red-600 flex items-center gap-1"><AlertTriangle size={16}/> {selectedVillage.warningWindow}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Response Status</p>
                <Badge variant="outline" className={selectedVillage.responseStatus === 'Action Required' ? 'border-red-500 text-red-700 bg-red-50' : ''}>{selectedVillage.responseStatus}</Badge>
              </div>
              
              <div>
                <p className="text-sm text-slate-500 mb-1">Population</p>
                <p className="font-bold text-lg flex items-center gap-2"><Users size={16} className="text-slate-400"/> {selectedVillage.population.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Roads at Risk</p>
                <p className="font-bold text-lg">{selectedVillage.infrastructure.roads}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Bridges at Risk</p>
                <p className="font-bold text-lg">{selectedVillage.infrastructure.bridges}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Critical Facilities</p>
                <p className="font-bold text-lg flex items-center gap-2"><Building size={16} className="text-slate-400"/> {selectedVillage.infrastructure.schools + selectedVillage.infrastructure.hospitals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="bg-red-50 border-red-200"><CardContent className="p-4"><p className="text-xs font-medium text-red-800">Critical Areas</p><h3 className="text-2xl font-bold text-red-900">{criticalAreas}</h3></CardContent></Card>
          <Card className="bg-orange-50 border-orange-200"><CardContent className="p-4"><p className="text-xs font-medium text-orange-800">High-Risk Areas</p><h3 className="text-2xl font-bold text-orange-900">{highAreas}</h3></CardContent></Card>
          <Card className="bg-yellow-50 border-yellow-200"><CardContent className="p-4"><p className="text-xs font-medium text-yellow-800">Moderate Areas</p><h3 className="text-2xl font-bold text-yellow-900">{modAreas}</h3></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Population Exposed</p><h3 className="text-2xl font-bold">{totalPop.toLocaleString()}</h3></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Critical Infra at Risk</p><h3 className="text-2xl font-bold">{totalInfra}</h3></CardContent></Card>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-lg">{selectedVillage ? `All Vulnerable Areas` : `Village Risk Distribution`}</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-y text-slate-600">
              <tr>
                <th className="px-4 py-3">Village</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Hazard</th>
                <th className="px-4 py-3">Combined Risk</th>
                <th className="px-4 py-3">Population</th>
                <th className="px-4 py-3">Roads</th>
                <th className="px-4 py-3">Bridges</th>
                <th className="px-4 py-3">Early Warning Window</th>
                <th className="px-4 py-3">Response Status</th>
              </tr>
            </thead>
            <tbody>
              {villages.map((v) => {
                let hazardText = '';
                if (v.flashFloodRisk === 'CRITICAL' && v.landslideRisk === 'CRITICAL') hazardText = 'Flood + Landslide';
                else if (v.flashFloodRisk === 'CRITICAL' || v.flashFloodRisk === 'HIGH') hazardText = 'Flash Flood';
                else if (v.landslideRisk === 'CRITICAL' || v.landslideRisk === 'HIGH') hazardText = 'Landslide';
                else hazardText = 'Flood';

                return (
                  <tr 
                    key={v.id} 
                    className={`border-b hover:bg-slate-50 cursor-pointer ${selectedVillageId === v.id ? 'bg-blue-50/50' : ''}`}
                    onClick={() => {
                      setSelectedVillageId(v.id);
                      router.push(`/authority/affected-areas?location=${encodeURIComponent(v.name)}`);
                    }}
                  >
                    <td className="px-4 py-3 font-bold text-slate-800">{v.name}</td>
                    <td className="px-4 py-3">{v.district}</td>
                    <td className="px-4 py-3">{hazardText}</td>
                    <td className="px-4 py-3">
                      <Badge variant={v.combinedRisk === 'CRITICAL' ? 'destructive' : v.combinedRisk === 'HIGH' ? 'high' : v.combinedRisk === 'MODERATE' ? 'warning' : 'success'}>{v.combinedRisk}</Badge>
                    </td>
                    <td className="px-4 py-3 font-medium">{v.population.toLocaleString()}</td>
                    <td className="px-4 py-3">{v.infrastructure.roads}</td>
                    <td className="px-4 py-3">{v.infrastructure.bridges}</td>
                    <td className="px-4 py-3 text-red-600 font-bold">{v.warningWindow}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        v.responseStatus === 'Action Required' ? 'border-red-500 text-red-700 bg-red-50' : 
                        v.responseStatus === 'Evacuation Prepared' ? 'border-orange-500 text-orange-700 bg-orange-50' :
                        v.responseStatus === 'Monitoring' ? 'border-blue-500 text-blue-700 bg-blue-50' : ''
                      }>
                        {v.responseStatus || 'UNKNOWN'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default function AffectedAreas() {
  return (
    <Suspense fallback={<div className="p-8 text-center animate-pulse">Loading location data...</div>}>
      <AffectedAreasContent />
    </Suspense>
  );
}
