"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function ModelValidation() {
  const { predictions, villages } = useStore();
  
  const getVillageName = (id: string) => villages.find(v => v.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Model Validation</h1>
          <p className="text-slate-500">Compare AI predictions with verified ground observations to evaluate model performance and support continuous improvement.</p>
        </div>
              </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card><CardContent className="p-4"><p className="text-xs font-medium text-slate-500">Predictions Reviewed</p><h3 className="text-2xl font-bold">42</h3></CardContent></Card>
        <Card className="bg-green-50 border-green-200"><CardContent className="p-4"><p className="text-xs font-medium text-green-800">Confirmed Events</p><h3 className="text-2xl font-bold text-green-900">28</h3></CardContent></Card>
        <Card className="bg-slate-100 border-slate-300"><CardContent className="p-4"><p className="text-xs font-medium text-slate-700">False Alarms</p><h3 className="text-2xl font-bold text-slate-800">7</h3></CardContent></Card>
        <Card className="bg-red-50 border-red-200"><CardContent className="p-4"><p className="text-xs font-medium text-red-800">Missed Events</p><h3 className="text-2xl font-bold text-red-900">3</h3></CardContent></Card>
        <Card className="bg-orange-50 border-orange-200"><CardContent className="p-4"><p className="text-xs font-medium text-orange-800">Pending Validation</p><h3 className="text-2xl font-bold text-orange-900">4</h3></CardContent></Card>
      </div>

      {/* Continuous Learning Workflow */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="py-4">
          <CardTitle className="text-lg text-blue-900">Continuous Learning Workflow</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="flex items-center justify-between min-w-[800px] text-sm text-center py-4 px-2">
            <div className="bg-white p-3 rounded-md border shadow-sm w-32"><p className="font-semibold text-blue-700">AI Prediction</p></div>
            <ArrowRight className="text-blue-400" />
            <div className="bg-white p-3 rounded-md border shadow-sm w-32"><p className="font-semibold text-slate-700">Ground Observation</p></div>
            <ArrowRight className="text-blue-400" />
            <div className="bg-white p-3 rounded-md border shadow-sm w-36"><p className="font-semibold text-slate-700">Admin/Authority Verification</p></div>
            <ArrowRight className="text-blue-400" />
            <div className="bg-white p-3 rounded-md border shadow-sm w-32"><p className="font-semibold text-slate-700">Validation & Evaluation</p></div>
            <ArrowRight className="text-blue-400" />
            <div className="bg-white p-3 rounded-md border shadow-sm w-32 border-blue-400"><p className="font-bold text-blue-800">Model Improvement</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-lg">Prediction vs Observation Records</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-y text-slate-600">
              <tr>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Predicted Hazard</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Prediction Time</th>
                <th className="px-4 py-3">Field Confirmation Time</th>
                <th className="px-4 py-3">Observed Lead Time</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => {
                // A very simplified hardcoded lead time calculator for prototype purposes
                // based on the string format. In a real app we'd use true Date objects.
                let leadTime = 'N/A';
                if (p.predictionTime === '01:15 AM' && p.fieldConfirmationTime === '09:35 AM') leadTime = '8 hr 20 min';
                if (p.predictionTime === '02:00 AM' && p.fieldConfirmationTime === '09:38 AM') leadTime = '7 hr 38 min';
                if (p.predictionTime === '11:30 PM (prev day)' && p.fieldConfirmationTime === '09:40 AM') leadTime = '10 hr 10 min';
                if (p.predictionTime === '03:45 AM' && p.fieldConfirmationTime === '09:25 AM') leadTime = '5 hr 40 min';
                if (p.predictionTime === '05:15 AM' && p.fieldConfirmationTime === '09:20 AM') leadTime = '4 hr 5 min';
                if (p.predictionTime === '04:00 AM' && p.fieldConfirmationTime === '09:18 AM') leadTime = '5 hr 18 min';

                return (
                  <tr key={p.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold">{getVillageName(p.villageId)}</td>
                    <td className="px-4 py-3">{p.predictedHazard}</td>
                    <td className="px-4 py-3">
                       <Badge variant={p.result === 'CONFIRMED' ? 'success' : p.result === 'FALSE ALARM' ? 'outline' : 'warning'}>
                          {p.result}
                       </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.predictionTime}</td>
                    <td className="px-4 py-3 text-slate-600">{p.fieldConfirmationTime}</td>
                    <td className="px-4 py-3 font-medium text-blue-700">{leadTime}</td>
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