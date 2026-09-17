"use client";
import RiskMap from "@/components/map/RiskMap";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminRiskMap() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Interactive Risk Map</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search village..."
              className="pl-8 pr-4 py-2 border rounded-md text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filters
          </Button>
        </div>
      </div>
      
      <Card className="flex-1 overflow-hidden relative">
        <RiskMap role="ADMIN" />
      </Card>
    </div>
  );
}
