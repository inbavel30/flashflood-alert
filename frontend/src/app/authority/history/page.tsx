"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowDown, Clock } from "lucide-react";

export default function EmergencyHistory() {
  const { historyEvents, villages } = useStore();
  const [activeTab, setActiveTab] = useState('ALL');

  const getVillageName = (id: string) => villages.find(v => v.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Emergency History</h1>
          <p className="text-slate-500">Review previous alerts, emergency actions, field observations, evacuations, and response outcomes.</p>
        </div>
              </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Historical Alerts</p><h3 className="text-2xl font-bold">126</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Resolved Events</p><h3 className="text-2xl font-bold text-slate-800">94</h3></CardContent></Card>
        <Card className="bg-green-50 border-green-200"><CardContent className="p-4"><p className="text-xs font-medium text-green-800">Confirmed Events</p><h3 className="text-2xl font-bold text-green-900">81</h3></CardContent></Card>
        <Card className="bg-slate-100"><CardContent className="p-4"><p className="text-xs font-medium text-slate-600">False Alarms</p><h3 className="text-2xl font-bold text-slate-700">13</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Response Actions</p><h3 className="text-2xl font-bold">108</h3></CardContent></Card>
      </div>

      <div className="flex border-b text-sm">
        {['ALL', 'ALERTS', 'FIELD_REPORTS', 'EVACUATIONS', 'RESPONSE_ACTIONS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {tab === 'ALL' ? 'All Events' : tab === 'ALERTS' ? 'Alerts' : tab === 'FIELD_REPORTS' ? 'Field Reports' : tab === 'EVACUATIONS' ? 'Evacuations' : 'Response Actions'}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Event Log</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-y text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Event ID</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Hazard</th>
                    <th className="px-4 py-3">Risk Level</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {historyEvents.map((evt) => (
                    <tr key={evt.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">{evt.id}</td>
                      <td className="px-4 py-3 font-bold">{getVillageName(evt.villageId)}</td>
                      <td className="px-4 py-3">{evt.hazard}</td>
                      <td className="px-4 py-3">
                         <Badge variant={evt.risk === 'Critical' ? 'destructive' : 'high'}>{evt.risk}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">{evt.time}</td>
                      <td className="px-4 py-3">
                         <Badge variant={evt.outcome === 'Confirmed' ? 'success' : evt.outcome === 'False Alarm' ? 'outline' : 'warning'}>
                           {evt.outcome}
                         </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="py-4 border-b">
              <CardTitle className="text-base flex items-center gap-2"><Clock size={18} /> Event Timeline: Gaurikund</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
                  <div className="relative">
                     <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[23px] top-1"></div>
                     <p className="text-xs text-slate-500 mb-1">09:05 AM</p>
                     <p className="font-semibold text-slate-800 text-sm">AI risk assessment generated.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[23px] top-1"></div>
                     <p className="text-xs text-slate-500 mb-1">09:10 AM</p>
                     <p className="font-semibold text-red-700 text-sm">Warning issued.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[23px] top-1"></div>
                     <p className="text-xs text-slate-500 mb-1">09:20 AM</p>
                     <p className="font-semibold text-slate-800 text-sm">Emergency Authority acknowledged alert.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[23px] top-1"></div>
                     <p className="text-xs text-slate-500 mb-1">09:25 AM</p>
                     <p className="font-semibold text-slate-800 text-sm">Evacuation preparedness initiated.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[23px] top-1"></div>
                     <p className="text-xs text-slate-500 mb-1">09:35 AM</p>
                     <p className="font-semibold text-slate-800 text-sm">Field report received.</p>
                  </div>
                  <div className="relative">
                     <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[23px] top-1"></div>
                     <p className="text-xs text-slate-500 mb-1">09:40 AM</p>
                     <p className="font-semibold text-green-700 text-sm">Event confirmed.</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}