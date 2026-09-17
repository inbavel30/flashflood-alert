"use client";
import CommunityMap from "@/components/map/CommunityMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function CommunityRiskMapPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Community Risk Map</h1>
          <p className="text-slate-500 text-sm">View current hazard areas, safer routes, shelters, and affected locations near your selected area.</p>
        </div>
      </div>
      
      <Card className="overflow-hidden shadow-md border-slate-200">
        <CardContent className="p-0">
          <CommunityMap />
        </CardContent>
      </Card>
    </div>
  );
}
