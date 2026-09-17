"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, Clock, MapPin, Map, X } from "lucide-react";

export default function AlertsHistory() {
  const { alerts, villages, updateAlertStatus } = useStore();
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationQuery = searchParams.get('location');

  const getVillageName = (id: string) => villages.find(v => v.id === id)?.name || id;

  const handleViewArea = (villageName: string) => {
    router.push(`/admin/affected-areas?location=${encodeURIComponent(villageName)}`);
  };

  const handleViewMap = (villageName: string) => {
    router.push(`/admin/risk-map?location=${encodeURIComponent(villageName)}`);
  };

  const clearLocationFilter = () => {
    router.push('/admin/alerts');
  };

  let filteredAlerts = activeTab === 'HISTORY' 
    ? alerts 
    : activeTab === 'ACTIVE'
      ? alerts.filter(a => a.status === 'ACTIVE')
      : alerts.filter(a => a.severity === activeTab && a.status === 'ACTIVE');

  if (locationQuery) {
    const targetVillage = villages.find(v => v.name.toLowerCase() === locationQuery.toLowerCase());
    if (targetVillage) {
      filteredAlerts = filteredAlerts.filter(a => a.villageId === targetVillage.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts & History</h1>
          <p className="text-slate-500">Monitor active flash-flood and landslide warnings and review the historical alert timeline.</p>
        </div>
              </div>

      {locationQuery && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            <span className="text-blue-800 font-medium">Filtering alerts for: <strong>{locationQuery}</strong></span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearLocationFilter} className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 h-8">
            <X size={14} className="mr-1" /> Clear Filter
          </Button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-5">
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Active Alerts</p><h3 className="text-2xl font-bold text-slate-800">6</h3></CardContent></Card>
        <Card className="bg-red-50 border-red-200"><CardContent className="p-4"><p className="text-xs font-medium text-red-800">Critical</p><h3 className="text-2xl font-bold text-red-900">3</h3></CardContent></Card>
        <Card className="bg-orange-50 border-orange-200"><CardContent className="p-4"><p className="text-xs font-medium text-orange-800">High / Warning</p><h3 className="text-2xl font-bold text-orange-900">2</h3></CardContent></Card>
        <Card className="bg-yellow-50 border-yellow-200"><CardContent className="p-4"><p className="text-xs font-medium text-yellow-800">Watch</p><h3 className="text-2xl font-bold text-yellow-900">1</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Alerts Today</p><h3 className="text-2xl font-bold text-slate-800">12</h3></CardContent></Card>
      </div>

      <div className="flex border-b text-sm">
        {['ACTIVE', 'WATCH', 'WARNING', 'CRITICAL', 'HISTORY'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {tab === 'HISTORY' ? 'Alert History' : tab === 'ACTIVE' ? 'Active Alerts' : tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No alerts found in this category.</div>
        ) : (
          filteredAlerts.map(alert => (
            <Card key={alert.id} className={alert.severity === 'CRITICAL' && alert.status === 'ACTIVE' ? 'border-red-500 shadow-sm' : ''}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : alert.severity === 'WARNING' ? 'high' : 'warning'}>
                        {alert.severity} RISK
                      </Badge>
                      <Badge variant="outline">{alert.hazard}</Badge>
                      {alert.status === 'ACTIVE' && <Badge variant="success">ACTIVE</Badge>}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-2">
                      <MapPin size={20} className="text-slate-400" /> {getVillageName(alert.villageId)}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Issued: {alert.timestamp}</p>
                    <p className="font-bold text-red-600 flex items-center justify-end gap-1"><Clock size={16} /> Warning: {villages.find(v => v.id === alert.villageId)?.warningWindow}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-md mb-4 border text-sm">
                  <p className="font-semibold text-slate-800 mb-1">Reason</p>
                  <p className="text-slate-600 mb-3">{alert.reason}</p>
                  <p className="font-semibold text-slate-800 mb-1">Recommended Action</p>
                  <p className="text-slate-600 font-medium">{alert.action}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleViewArea(getVillageName(alert.villageId))}
                  >
                    <MapPin size={16} /> View Area
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleViewMap(getVillageName(alert.villageId))}
                  >
                    <Map size={16} /> View Map
                  </Button>
                  {alert.status === 'ACTIVE' && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => updateAlertStatus(alert.id, 'RESOLVED')}
                    >
                      Acknowledge / Resolve
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}