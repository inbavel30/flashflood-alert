"use client";

import { useStore, Alert } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { MapPin, Map, Navigation, CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function AlertActionButtons({ alert }: { alert: Alert }) {
  const router = useRouter();
  const { villages, updateAlertStatus, addHistoryEvent } = useStore();
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);

  const village = villages.find(v => v.id === alert.villageId);
  const locationName = village?.name || "Unknown";

  const handleViewArea = () => {
    router.push(`/authority/affected-areas?location=${encodeURIComponent(locationName)}`);
  };

  const handleViewMap = () => {
    router.push(`/authority/risk-map?location=${encodeURIComponent(locationName)}`);
  };

  const handleEvacuationGuidance = () => {
    router.push(`/authority/emergency-response?location=${encodeURIComponent(locationName)}`);
  };

  const getCurrentTimeStr = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleAcknowledge = () => {
    updateAlertStatus(alert.id, 'ACKNOWLEDGED');
    
    // Create history event
    addHistoryEvent({
      id: `EVT-ACK-${Date.now()}`,
      villageId: alert.villageId,
      hazard: alert.hazard,
      risk: alert.severity,
      time: getCurrentTimeStr(),
      outcome: 'Alert Acknowledged',
      action: 'Acknowledged',
      user: 'Emergency Authority',
      previousStatus: alert.status,
      newStatus: 'ACKNOWLEDGED'
    });
  };

  const handleEscalate = () => {
    updateAlertStatus(alert.id, 'ESCALATED');
    
    // Create history event
    addHistoryEvent({
      id: `EVT-ESC-${Date.now()}`,
      villageId: alert.villageId,
      hazard: alert.hazard,
      risk: alert.severity,
      time: getCurrentTimeStr(),
      outcome: 'Alert Escalated',
      action: 'Escalated',
      user: 'Emergency Authority',
      previousStatus: alert.status,
      newStatus: 'ESCALATED'
    });
    
    setEscalateModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        <Button onClick={handleViewArea} variant="outline" size="sm" className="h-9 gap-1.5 font-medium text-slate-700 hover:text-slate-900">
          <MapPin size={16} className="text-slate-500"/> View Area
        </Button>
        <Button onClick={handleViewMap} variant="outline" size="sm" className="h-9 gap-1.5 font-medium text-slate-700 hover:text-slate-900">
          <Map size={16} className="text-slate-500"/> View Map
        </Button>
        <Button onClick={handleEvacuationGuidance} variant="outline" size="sm" className="h-9 gap-1.5 font-medium text-slate-700 hover:text-slate-900">
          <Navigation size={16} className="text-slate-500"/> Evacuation Guidance
        </Button>
        
        {alert.status === 'ACTIVE' && (
          <>
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-9 gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
              onClick={handleAcknowledge}
            >
              <CheckCircle size={16} /> Acknowledge
            </Button>
            <Button 
              variant="default" 
              className="h-9 gap-1.5 bg-red-600 hover:bg-red-700 text-white shadow-sm"
              size="sm" 
              onClick={() => setEscalateModalOpen(true)}
            >
              <AlertTriangle size={16} /> Escalate
            </Button>
          </>
        )}
      </div>

      {escalateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[425px] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-red-600 mb-2">
                <AlertTriangle /> Escalate Alert
              </h2>
              <p className="text-slate-600 text-base mb-4">
                Are you sure you want to escalate this emergency alert?
              </p>
              
              <div className="bg-slate-50 p-4 rounded-md border space-y-2">
                <div className="flex justify-between"><span className="text-slate-500">Location:</span><span className="font-bold">{village?.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">District:</span><span className="font-bold">{village?.district}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Hazard:</span><span className="font-bold">{alert.hazard}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Risk Level:</span><Badge variant="destructive">{alert.severity}</Badge></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Current Status:</span><Badge variant="outline">{alert.status}</Badge></div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setEscalateModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white gap-2" onClick={handleEscalate}>
                  <AlertTriangle size={16} /> Escalate Alert
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
