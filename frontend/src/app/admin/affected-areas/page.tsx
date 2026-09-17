"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, AlertTriangle, X, MapPin, Map, ShieldAlert, Activity } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AffectedAreas() {
  const { villages, alerts, fieldReports } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const locationQuery = searchParams.get('location');
  const [selectedVillage, setSelectedVillage] = useState<any>(null);

  useEffect(() => {
    if (locationQuery) {
      const v = villages.find(vil => vil.name === locationQuery);
      if (v) setSelectedVillage(v);
    } else {
      setSelectedVillage(null);
    }
  }, [locationQuery, villages]);

  const criticalAreas = villages.filter(v => v.combinedRisk === 'CRITICAL').length;
  const highAreas = villages.filter(v => v.combinedRisk === 'HIGH').length;
  const modAreas = villages.filter(v => v.combinedRisk === 'MODERATE').length;
  const totalPop = villages.reduce((acc, v) => acc + v.population, 0);
  const totalInfra = villages.reduce((acc, v) => acc + v.infrastructure.roads + v.infrastructure.bridges + v.infrastructure.schools + v.infrastructure.hospitals, 0);

  const handleRowClick = (villageName: string) => {
    router.push(`/admin/affected-areas?location=${encodeURIComponent(villageName)}`);
  };

  const closeModal = () => {
    router.push('/admin/affected-areas');
  };

  const getHazardText = (v: any) => {
    if (v.flashFloodRisk === 'CRITICAL' && v.landslideRisk === 'CRITICAL') return 'Flash Flood + Landslide';
    else if (v.flashFloodRisk === 'CRITICAL' || v.flashFloodRisk === 'HIGH') return 'Flash Flood';
    else if (v.landslideRisk === 'CRITICAL' || v.landslideRisk === 'HIGH') return 'Landslide';
    return 'Flood';
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Affected Areas</h1>
          <p className="text-slate-500">Identify villages and critical infrastructure exposed to flash-flood, landslide, and combined hazard conditions.</p>
        </div>
              </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-red-50 border-red-200"><CardContent className="p-4"><p className="text-xs font-medium text-red-800">Critical Areas</p><h3 className="text-2xl font-bold text-red-900">{criticalAreas}</h3></CardContent></Card>
        <Card className="bg-orange-50 border-orange-200"><CardContent className="p-4"><p className="text-xs font-medium text-orange-800">High-Risk Areas</p><h3 className="text-2xl font-bold text-orange-900">{highAreas}</h3></CardContent></Card>
        <Card className="bg-yellow-50 border-yellow-200"><CardContent className="p-4"><p className="text-xs font-medium text-yellow-800">Moderate Areas</p><h3 className="text-2xl font-bold text-yellow-900">{modAreas}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Population Exposed</p><h3 className="text-2xl font-bold">{totalPop.toLocaleString()}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Critical Infra at Risk</p><h3 className="text-2xl font-bold">{totalInfra}</h3></CardContent></Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-lg">Village Risk Distribution</CardTitle>
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
                <th className="px-4 py-3">Schools</th>
                <th className="px-4 py-3">Hospitals</th>
                <th className="px-4 py-3">Early Warning Window</th>
              </tr>
            </thead>
            <tbody>
              {villages.map((v) => {
                return (
                  <tr key={v.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => handleRowClick(v.name)}>
                    <td className="px-4 py-3 font-bold text-slate-800">{v.name}</td>
                    <td className="px-4 py-3">{v.district}</td>
                    <td className="px-4 py-3">{getHazardText(v)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={v.combinedRisk === 'CRITICAL' ? 'destructive' : v.combinedRisk === 'HIGH' ? 'high' : v.combinedRisk === 'MODERATE' ? 'warning' : 'success'}>{v.combinedRisk}</Badge>
                    </td>
                    <td className="px-4 py-3 font-medium">{v.population.toLocaleString()}</td>
                    <td className="px-4 py-3">{v.infrastructure.roads}</td>
                    <td className="px-4 py-3">{v.infrastructure.bridges}</td>
                    <td className="px-4 py-3">{v.infrastructure.schools}</td>
                    <td className="px-4 py-3">{v.infrastructure.hospitals}</td>
                    <td className="px-4 py-3 text-red-600 font-bold">{v.warningWindow}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {selectedVillage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MapPin className="text-blue-600" /> {selectedVillage.name} Detailed Area View
                </h2>
                <p className="text-slate-500 text-sm mt-1">{selectedVillage.district}, Uttarakhand</p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 grid gap-6 md:grid-cols-2">
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="text-lg">Village Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Village</p>
                      <p className="font-bold text-slate-800">{selectedVillage.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">District</p>
                      <p className="font-semibold text-slate-700">{selectedVillage.district}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Population</p>
                      <p className="font-bold flex items-center gap-1 text-slate-800"><Users size={16} className="text-slate-400"/> {selectedVillage.population.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Early Warning Window</p>
                      <p className="font-bold text-red-600">{selectedVillage.warningWindow}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-slate-500 font-medium">Hazard</p>
                      <p className="font-bold text-slate-800">{getHazardText(selectedVillage)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 border-b bg-slate-50">
                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-slate-600 font-medium">Combined Risk</span>
                      <Badge variant={selectedVillage.combinedRisk === 'CRITICAL' ? 'destructive' : selectedVillage.combinedRisk === 'HIGH' ? 'high' : 'warning'} className="text-sm px-3 py-1">
                        {selectedVillage.combinedRisk}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-slate-600 font-medium">Flash Flood Risk</span>
                      <Badge variant={selectedVillage.flashFloodRisk === 'CRITICAL' ? 'destructive' : selectedVillage.flashFloodRisk === 'HIGH' ? 'high' : 'warning'}>{selectedVillage.flashFloodRisk}</Badge>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-sm text-slate-600 font-medium">Landslide Risk</span>
                      <Badge variant={selectedVillage.landslideRisk === 'CRITICAL' ? 'destructive' : selectedVillage.landslideRisk === 'HIGH' ? 'high' : 'warning'}>{selectedVillage.landslideRisk}</Badge>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md text-sm border border-red-100">
                      <p className="font-semibold text-red-800 flex items-center gap-1 mb-1"><Activity size={14}/> Risk Drivers</p>
                      <p className="text-red-700">Extreme precipitation, high soil saturation, steep slopes.</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-md text-sm border border-orange-200 mt-2">
                      <p className="font-semibold text-orange-900 mb-1">Recommended Response Action</p>
                      <p className="text-orange-800">{selectedVillage.combinedRisk === 'CRITICAL' ? 'Immediate Evacuation Required. Deploy NDRF.' : 'Stay alert, prepare for possible evacuation.'}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium text-slate-600">Response Status:</span>
                      <span className="font-bold text-slate-800">{selectedVillage.responseStatus}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="text-lg flex items-center gap-2"><Building size={18} className="text-slate-500" /> Infrastructure at Risk</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-50 p-3 rounded border">
                      <p className="text-2xl font-bold text-slate-800">{selectedVillage.infrastructure.roads}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase">Roads</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border">
                      <p className="text-2xl font-bold text-slate-800">{selectedVillage.infrastructure.bridges}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase">Bridges</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border">
                      <p className="text-2xl font-bold text-slate-800">{selectedVillage.infrastructure.schools}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase">Schools</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border">
                      <p className="text-2xl font-bold text-slate-800">{selectedVillage.infrastructure.hospitals}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase">Hospitals</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="text-lg flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> Related Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 max-h-[160px] overflow-y-auto space-y-3">
                    {alerts.filter(a => a.villageId === selectedVillage.id).length > 0 ? (
                      alerts.filter(a => a.villageId === selectedVillage.id).map(a => (
                        <div key={a.id} className="border border-red-200 rounded-md bg-red-50/50 px-3 py-2">
                          <p className="text-xs font-bold text-slate-500">{a.timestamp} • {a.status}</p>
                          <p className="text-sm font-semibold text-slate-800">{a.hazard}</p>
                          <p className="text-xs text-slate-600">{a.reason}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No active alerts for this location.</p>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push(`/admin/risk-map?location=${encodeURIComponent(selectedVillage.name)}`)}>
                    <Map size={16} className="mr-2" /> View Location on Map
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}