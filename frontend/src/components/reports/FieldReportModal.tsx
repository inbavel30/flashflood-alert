"use client";

import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Camera, User, FileText, AlertTriangle, ShieldAlert, Activity, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function FieldReportModal({ 
  reportId, 
  isOpen, 
  onClose,
  canReview = true
}: { 
  reportId: string | null; 
  isOpen: boolean; 
  onClose: () => void;
  canReview?: boolean;
}) {
  const router = useRouter();
  const { fieldReports, villages, alerts, predictions, updateFieldReportStatus } = useStore();
  
  if (!isOpen || !reportId) return null;
  
  const report = fieldReports.find(r => r.id === reportId);
  if (!report) return null;

  const village = villages.find(v => v.id === report.villageId);
  const alert = alerts.find(a => a.id === report.relatedAlertId);
  const prediction = predictions.find(p => p.id === report.relatedPredictionId);

  const handleStatusUpdate = (status: any) => {
    updateFieldReportStatus(report.id, status);
  };

  const handleViewMap = () => {
    onClose();
    router.push('/admin/risk-map');
  };

  const handleViewAlert = () => {
    onClose();
    router.push('/admin/alerts');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b p-5 bg-slate-50">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <FileText className="h-6 w-6 text-blue-600" /> 
            FIELD EVENT REPORT
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* BODY (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* REPORT INFORMATION */}
          <section>
            <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Report Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm">
              <div><p className="text-slate-500 font-medium">Report ID</p><p className="font-bold">{report.id}</p></div>
              <div>
                <p className="text-slate-500 font-medium">Event Status</p>
                <Badge variant={report.eventStatus === 'Event Confirmed' ? 'success' : report.eventStatus === 'False Alarm' ? 'outline' : 'warning'}>
                  {report.eventStatus.toUpperCase()}
                </Badge>
              </div>
              <div><p className="text-slate-500 font-medium">Hazard</p><p className="font-bold text-red-600 uppercase">{report.hazard}</p></div>
              <div><p className="text-slate-500 font-medium">Location</p><p className="font-semibold">{village?.name || 'Unknown'}</p></div>
              <div><p className="text-slate-500 font-medium">District</p><p className="font-semibold">{village?.district || 'Unknown'}</p></div>
              <div><p className="text-slate-500 font-medium">State</p><p className="font-semibold">Uttarakhand</p></div>
              <div><p className="text-slate-500 font-medium">Reported By</p><p className="font-semibold flex items-center gap-1"><User size={14}/> {report.reporter}</p></div>
              <div><p className="text-slate-500 font-medium">Reported Time</p><p className="font-semibold flex items-center gap-1"><Clock size={14}/> {report.time}</p></div>
              <div><p className="text-slate-500 font-medium">Report Submitted</p><p className="font-semibold flex items-center gap-1"><Clock size={14}/> {report.time}</p></div>
            </div>
          </section>

          {/* EVENT OBSERVATION */}
          <section>
            <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Event Observation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 font-medium mb-1">Event Details:</p>
                <p className="bg-slate-50 p-3 rounded-md border text-slate-700 italic">"{report.eventDetails}"</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium mb-2">Current Observation:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm bg-slate-50 p-3 rounded-md border">
                  {report.currentObservations.map((obs, i) => (
                    <li key={i}>{obs}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* EVIDENCE & LOCATION */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Evidence</h3>
              <div className="bg-slate-100 h-40 rounded-md flex flex-col items-center justify-center text-slate-400 mb-4 border-2 border-dashed border-slate-300">
                <Camera size={32} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">Photo evidence unavailable</p>
              </div>
              <div className="text-sm space-y-2 bg-slate-50 p-3 rounded-md border">
                <p><span className="text-slate-500 font-medium">Observation Timestamp:</span> {report.time}</p>
                <p><span className="text-slate-500 font-medium">Observer Notes:</span> {report.observerNotes}</p>
              </div>
            </section>
            
            <section>
              <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Location</h3>
              <div className="bg-slate-50 p-4 rounded-md border space-y-3 text-sm h-[calc(100%-2.5rem)] flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="font-bold text-base">{village?.name}</p>
                      <p className="text-slate-600">{village?.district}, Uttarakhand</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">GPS Location:</p>
                    <p className="font-mono bg-white p-1.5 border rounded inline-block mt-1">{report.gps}</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={handleViewMap}>View on Map</Button>
              </div>
            </section>
          </div>

          {/* RELATED AI PREDICTION */}
          {prediction && (
            <section>
              <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Related AI Prediction</h3>
              <div className="bg-blue-50/50 border border-blue-200 p-5 rounded-md text-sm grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-slate-500 font-medium">Prediction ID</p>
                  <p className="font-bold flex items-center gap-1"><Activity size={14} className="text-blue-500"/> {prediction.id}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Predicted Hazard</p>
                  <p className="font-semibold">{prediction.predictedHazard}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Predicted Risk</p>
                  <Badge variant={prediction.risk === 'Critical' ? 'destructive' : prediction.risk === 'High' ? 'high' : 'warning'} className="mt-1">{prediction.risk.toUpperCase()}</Badge>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Prediction Time</p>
                  <p className="font-semibold">{prediction.predictionTime || '09:05 AM'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-500 font-medium mb-1">Early Warning Window</p>
                  <p className="font-bold text-red-600">{villages.find(v => v.id === report.villageId)?.warningWindow}</p>
                  <p className="text-[10px] text-slate-400">Estimated potential lead time for preparedness.</p>
                </div>
                <div className="md:col-span-2 mt-2">
                  <p className="text-slate-500 font-medium mb-2">Risk Factors:</p>
                  <ul className="list-disc list-inside text-slate-700 bg-white p-3 rounded border">
                    <li>Heavy rainfall</li>
                    <li>Increasing soil moisture</li>
                    <li>Steep terrain</li>
                    <li>Slope instability</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* RELATED ALERT */}
          {alert && (
            <section>
              <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Related Alert</h3>
              <div className="bg-red-50/30 border border-red-200 p-5 rounded-md text-sm grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-slate-500 font-medium">Alert ID</p>
                  <p className="font-bold flex items-center gap-1"><ShieldAlert size={14} className="text-red-500"/> {alert.id}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Alert Type</p>
                  <p className="font-semibold uppercase">{alert.hazard}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Alert Risk</p>
                  <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : alert.severity === 'WARNING' ? 'high' : 'warning'} className="mt-1">{alert.severity}</Badge>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Alert Status</p>
                  <Badge variant={alert.status === 'ACTIVE' ? 'destructive' : 'outline'} className="mt-1">{alert.status}</Badge>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Alert Issued</p>
                  <p className="font-semibold">{alert.timestamp}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Early Warning Window</p>
                  <p className="font-bold text-red-600">{villages.find(v => v.id === report.villageId)?.warningWindow}</p>
                  <p className="text-[10px] text-slate-400">Estimated potential lead time for preparedness.</p>
                </div>
                <div className="md:col-span-2 mt-2 pt-2 border-t border-red-100">
                  <Button variant="outline" size="sm" onClick={handleViewAlert} className="w-full md:w-auto">View Alert</Button>
                </div>
              </div>
            </section>
          )}

          {/* VALIDATION & REVIEW */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Validation Status</h3>
              <div className="p-5 bg-slate-50 border rounded-md h-[calc(100%-2.5rem)] flex flex-col justify-center items-center text-center">
                <p className="text-slate-500 font-medium text-sm mb-3">Current Validation Status:</p>
                <div className="text-xl font-black tracking-wider">
                  {report.eventStatus === 'Pending Review' ? <span className="text-orange-500">PENDING REVIEW</span> :
                   report.eventStatus === 'Event Confirmed' ? <span className="text-green-600">EVENT CONFIRMED</span> :
                   report.eventStatus === 'False Alarm' ? <span className="text-slate-500">FALSE ALARM</span> :
                   <span className="text-blue-600">{report.eventStatus.toUpperCase()}</span>}
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Authority / Admin Review</h3>
              <div className="p-5 bg-slate-50 border rounded-md text-sm space-y-4 h-[calc(100%-2.5rem)]">
                <div className="flex justify-between">
                  <p className="text-slate-500 font-medium">Reviewed By:</p>
                  <p className="font-semibold text-right">{report.reviewStatus === 'Reviewed' ? 'Admin / Emergency Authority' : '-'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-slate-500 font-medium">Review Status:</p>
                  <Badge variant={report.reviewStatus === 'Reviewed' ? 'success' : 'outline'}>{report.reviewStatus}</Badge>
                </div>
                <div>
                  <p className="text-slate-500 font-medium mb-1">Review Notes:</p>
                  <p className="italic text-slate-700 bg-white p-3 rounded border">
                    {report.reviewStatus === 'Reviewed' ? `"${report.reviewNotes}"` : '"Awaiting verification."'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* EVENT TIMELINE */}
          <section>
            <h3 className="font-bold text-slate-800 text-lg border-b pb-2 mb-4">Event Timeline</h3>
            <div className="bg-slate-50 p-6 border rounded-md">
              <div className="relative border-l-2 border-slate-300 ml-4 space-y-8 pb-2">
                {prediction && (
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[25px] top-0 border-2 border-white shadow-sm"></div>
                    <p className="text-xs font-bold text-slate-500 mb-0.5">{prediction.predictionTime || '09:05 AM'}</p>
                    <p className="font-bold text-slate-800">AI risk assessment generated</p>
                  </div>
                )}
                {alert && (
                  <>
                    <div className="relative">
                      <div className="absolute w-4 h-4 bg-red-500 rounded-full -left-[25px] top-0 border-2 border-white shadow-sm"></div>
                      <p className="text-xs font-bold text-slate-500 mb-0.5">{alert.timestamp}</p>
                      <p className="font-bold text-red-600">Warning issued</p>
                    </div>
                    <div className="relative">
                      <div className="absolute w-4 h-4 bg-orange-400 rounded-full -left-[25px] top-0 border-2 border-white shadow-sm"></div>
                      <p className="text-xs font-bold text-slate-500 mb-0.5">{(alert.timestamp.replace(/[:]/, (m) => ':1'))}</p>
                      <p className="font-bold text-slate-800">Emergency Authority acknowledged alert</p>
                    </div>
                  </>
                )}
                <div className="relative">
                  <div className="absolute w-4 h-4 bg-slate-400 rounded-full -left-[25px] top-0 border-2 border-white shadow-sm"></div>
                  <p className="text-xs font-bold text-slate-500 mb-0.5">{report.time}</p>
                  <p className="font-bold text-slate-800">Field report submitted</p>
                </div>
                {report.reviewStatus === 'Reviewed' && (
                  <div className="relative">
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[25px] top-0 border-2 border-white shadow-sm"></div>
                    <p className="text-xs font-bold text-slate-500 mb-0.5">{(report.time.replace(/[:]/, (m) => ':2'))}</p>
                    <p className="font-bold text-green-700">Event {report.eventStatus.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* ACTIONS */}
        <div className="border-t p-5 bg-slate-100 flex flex-wrap gap-3 justify-end items-center">
          <Button variant="outline" onClick={handleViewMap}>View on Map</Button>
          {alert && <Button variant="outline" onClick={handleViewAlert}>View Alert</Button>}
          {canReview && (
            <>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleStatusUpdate('Pending Review')}>Review Report</Button>
              <Button variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusUpdate('Event Confirmed')}>Confirm Event</Button>
              <Button variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200" onClick={() => handleStatusUpdate('Partial Impact')}>Mark Partial Impact</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-200" onClick={() => handleStatusUpdate('False Alarm')}>Mark False Alarm</Button>
            </>
          )}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
