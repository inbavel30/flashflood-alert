"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FieldReportModal } from "@/components/reports/FieldReportModal";

export default function FieldReports() {
  const { fieldReports, villages, updateFieldReportStatus } = useStore();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  
  const pending = fieldReports.filter(r => r.eventStatus === 'Pending Review').length;
  const confirmed = fieldReports.filter(r => r.eventStatus === 'Event Confirmed').length;
  const partial = fieldReports.filter(r => r.eventStatus === 'Partial Impact').length;
  const falseAlarm = fieldReports.filter(r => r.eventStatus === 'False Alarm').length;

  const getVillageName = (id: string) => villages.find(v => v.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Field Reports</h1>
          <p className="text-slate-500">Review ground observations from affected locations and compare them with AI-generated risk assessments.</p>
        </div>
              </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Total Reports</p><h3 className="text-2xl font-bold">28</h3></CardContent></Card>
        <Card className="bg-orange-50 border-orange-200"><CardContent className="p-4"><p className="text-xs font-medium text-orange-800">Pending Review</p><h3 className="text-2xl font-bold text-orange-900">{pending}</h3></CardContent></Card>
        <Card className="bg-green-50 border-green-200"><CardContent className="p-4"><p className="text-xs font-medium text-green-800">Event Confirmed</p><h3 className="text-2xl font-bold text-green-900">{confirmed}</h3></CardContent></Card>
        <Card className="bg-yellow-50 border-yellow-200"><CardContent className="p-4"><p className="text-xs font-medium text-yellow-800">Partial Impact</p><h3 className="text-2xl font-bold text-yellow-900">{partial}</h3></CardContent></Card>
        <Card className="bg-slate-100"><CardContent className="p-4"><p className="text-xs font-medium text-slate-600">False Alarm</p><h3 className="text-2xl font-bold text-slate-700">{falseAlarm}</h3></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-lg">Ground Observations</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-y text-slate-600">
              <tr>
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Reporter</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Hazard</th>
                <th className="px-4 py-3">Event Status</th>
                <th className="px-4 py-3">Review</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fieldReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-700">{report.id}</td>
                  <td className="px-4 py-3">{report.reporter}</td>
                  <td className="px-4 py-3 font-bold">{getVillageName(report.villageId)}</td>
                  <td className="px-4 py-3 text-xs">{report.time}</td>
                  <td className="px-4 py-3">{report.hazard}</td>
                  <td className="px-4 py-3">
                    <Badge variant={report.eventStatus === 'Event Confirmed' ? 'success' : report.eventStatus === 'Pending Review' ? 'warning' : 'outline'}>
                      {report.eventStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                     <Badge variant={report.reviewStatus === 'Reviewed' ? 'success' : 'outline'}>{report.reviewStatus}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="secondary" onClick={() => setSelectedReportId(report.id)}>View Report</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <FieldReportModal 
        reportId={selectedReportId} 
        isOpen={!!selectedReportId} 
        onClose={() => setSelectedReportId(null)} 
      />
    </div>
  );
}