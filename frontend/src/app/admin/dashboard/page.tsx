"use client";
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, Radio, Database, CloudRain, ExternalLink, MapPin, 
  AlertTriangle, Thermometer, Wind, Droplets, Battery, Map, 
  Clock, ShieldAlert, ArrowRight, Zap, Users, Home, Navigation,
  Signal, ShieldCheck, FileText, CheckCircle2, XCircle
} from "lucide-react";
import Link from "next/link";
import { useStore } from '@/store/useStore';
import RiskMap from "@/components/map/RiskMap";
// Assuming recharts is available
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const riskTrendData = [
  { time: '00:00', flashFlood: 20, landslide: 30, combined: 25 },
  { time: '04:00', flashFlood: 25, landslide: 35, combined: 30 },
  { time: '08:00', flashFlood: 45, landslide: 40, combined: 50 },
  { time: '12:00', flashFlood: 85, landslide: 60, combined: 80 },
  { time: '16:00', flashFlood: 75, landslide: 70, combined: 85 },
  { time: '20:00', flashFlood: 60, landslide: 80, combined: 75 },
  { time: '24:00', flashFlood: 90, landslide: 85, combined: 95 },
];

export default function AdminDashboard() {
  const fetchDashboardData = useStore(state => state.fetchDashboardData);
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const villages = useStore(state => state.villages);
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Command Center</h1>
          <p className="text-slate-500">Real-time disaster management and monitoring.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm bg-green-50 text-green-700 border-green-200 py-1 px-3">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            System Active
          </Badge>
        </div>
      </div>

      {/* 2. RISK SUMMARY */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-1 lg:col-span-2 border-red-500/50 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Current System Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-red-600">CRITICAL</span>
            </div>
            <p className="text-xs text-red-600/80 mt-1 font-medium">Immediate Action Required</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/50 bg-orange-50/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Flash Flood Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">HIGH</div>
            <p className="text-[10px] text-slate-500 mt-1">Gaurikund, Rambara</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50 bg-yellow-50/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Landslide Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">MODERATE</div>
            <p className="text-[10px] text-slate-500 mt-1">Tapovan, Lata</p>
          </CardContent>
        </Card>

        <Card className="border-red-500/50 bg-red-50/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Combined Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">CRITICAL</div>
            <p className="text-[10px] text-slate-500 mt-1">High synergy detected</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Early Warning Window</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">24 HOURS</div>
            <p className="text-[10px] text-slate-500 mt-1">Estimated potential lead time for preparedness.</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. LIVE SENSOR READINGS + LOCATION & RISK MAP */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* SENSORS */}
        <div className="space-y-4 lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Live Sensor Data</CardTitle>
              <Badge variant="outline" className="bg-slate-50">Updated: Just now</Badge>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex flex-col items-center justify-center text-center">
                  <CloudRain className="w-5 h-5 text-blue-500 mb-1" />
                  <span className="text-xs text-slate-500">Rainfall</span>
                  <span className="text-lg font-bold text-slate-700">45 mm/hr</span>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex flex-col items-center justify-center text-center">
                  <Droplets className="w-5 h-5 text-amber-500 mb-1" />
                  <span className="text-xs text-slate-500">Soil Moisture</span>
                  <span className="text-lg font-bold text-slate-700">82%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center justify-center text-center">
                  <Activity className="w-5 h-5 text-slate-500 mb-1" />
                  <span className="text-xs text-slate-500">Tilt X/Y</span>
                  <span className="text-lg font-bold text-slate-700">2.1° / 1.4°</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center justify-center text-center">
                  <Thermometer className="w-5 h-5 text-slate-500 mb-1" />
                  <span className="text-xs text-slate-500">Temp / Hum</span>
                  <span className="text-lg font-bold text-slate-700">22°C / 95%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center justify-center text-center">
                  <Wind className="w-5 h-5 text-slate-500 mb-1" />
                  <span className="text-xs text-slate-500">Pressure</span>
                  <span className="text-lg font-bold text-slate-700">1008 hPa</span>
                </div>
                <div className="p-3 bg-green-50/50 rounded-lg border border-green-100 flex flex-col items-center justify-center text-center">
                  <Battery className="w-5 h-5 text-green-500 mb-1" />
                  <span className="text-xs text-slate-500">Node Battery</span>
                  <span className="text-lg font-bold text-slate-700">Avg 88%</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Sensor Status</span>
                  <span className="text-xs text-slate-500">LoRa: <strong className="text-green-600">ACTIVE</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-green-500 h-full" style={{ width: '88%' }}></div>
                    <div className="bg-red-500 h-full" style={{ width: '12%' }}></div>
                  </div>
                  <span className="font-medium">24/27</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>24 Online</span>
                  <span>3 Offline</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/sensors-data">View All Sensor Data <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* MAP */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Location & Risk Map</CardTitle>
                <p className="text-sm text-muted-foreground">Uttarakhand - Rudraprayag & Chamoli Districts</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/risk-map"><Map className="w-4 h-4 mr-2"/> Full Map</Link>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden relative min-h-[400px]">
              <RiskMap role="ADMIN" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. RISK TREND + RECENT ALERTS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Risk Trend</CardTitle>
              <p className="text-sm text-muted-foreground">Last 24 Hours</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">6H</Badge>
              <Badge variant="secondary" className="cursor-pointer">12H</Badge>
              <Badge className="cursor-pointer bg-slate-800">24H</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" textAnchor="end" tick={{fontSize: 10}} />
                <YAxis domain={[0, 100]} tick={{fontSize: 10}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: '12px'}}/>
                <Line type="monotone" dataKey="flashFlood" name="Flash Flood" stroke="#ea580c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="landslide" name="Landslide" stroke="#ca8a04" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="combined" name="Combined Risk" stroke="#dc2626" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <p className="text-sm text-muted-foreground">System generated warnings</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/alerts">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-red-50/50 border border-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-red-900 text-sm">Critical Flash Flood Warning</h4>
                    <span className="text-xs text-slate-500">10 mins ago</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">Extreme rainfall detected in upper catchment. Expected impact in Gaurikund.</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                      <Link href="/admin/affected-areas">View Area</Link>
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        if (window.confirm('WARNING: Are you sure you want to broadcast the emergency siren to Gaurikund?')) {
                          window.alert('Emergency siren activated successfully in Gaurikund.');
                        }
                      }}
                    >
                      Broadcast Siren
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50/50 border border-orange-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-orange-900 text-sm">High Landslide Risk</h4>
                    <span className="text-xs text-slate-500">45 mins ago</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">Significant tilt and soil saturation increase along NH-107 (Rambara stretch).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50/50 border border-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-yellow-900 text-sm">Moderate Combined Risk</h4>
                    <span className="text-xs text-slate-500">2 hrs ago</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">Weather systems indicating prolonged precipitation over Chamoli region.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. LIVE SITUATION + IMPACT SUMMARY */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Operational Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-xs font-medium text-slate-500 w-12 pt-1">09:52</div>
                <div className="flex-1 pb-4 border-l-2 border-red-500 pl-4 relative">
                  <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[7px] top-1"></div>
                  <p className="font-semibold text-sm text-slate-800">Critical Warning Issued</p>
                  <p className="text-xs text-slate-600 mt-0.5">Automated SMS and App alerts dispatched to Rambara & Gaurikund authorities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-medium text-slate-500 w-12 pt-1">09:49</div>
                <div className="flex-1 pb-4 border-l-2 border-orange-500 pl-4 relative">
                  <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1"></div>
                  <p className="font-semibold text-sm text-slate-800">Risk Level Escalated</p>
                  <p className="text-xs text-slate-600 mt-0.5">Combined risk model crossed 90% threshold.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-medium text-slate-500 w-12 pt-1">09:43</div>
                <div className="flex-1 pb-4 border-l-2 border-yellow-500 pl-4 relative">
                  <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[7px] top-1"></div>
                  <p className="font-semibold text-sm text-slate-800">Geotechnical Anomaly</p>
                  <p className="text-xs text-slate-600 mt-0.5">Sensors T-04, T-05 indicating sudden tilt increase.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-xs font-medium text-slate-500 w-12 pt-1">09:15</div>
                <div className="flex-1 pl-4 relative">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                  <p className="font-semibold text-sm text-slate-800">Heavy Rainfall Detected</p>
                  <p className="text-xs text-slate-600 mt-0.5">Rainfall intensity exceeded 30mm/hr in upper catchments.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Impact Summary</CardTitle>
              <p className="text-sm text-muted-foreground">Estimated exposure based on current risk zones</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/affected-areas">Details</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                <div className="p-2 bg-blue-100 rounded-md text-blue-700"><Users size={20}/></div>
                <div>
                  <p className="text-xs text-slate-500">People Exposed</p>
                  <p className="font-bold text-lg text-slate-800">~8,500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="p-2 bg-red-100 rounded-md text-red-700"><Home size={20}/></div>
                <div>
                  <p className="text-xs text-slate-500 text-red-600/80">Critical Villages</p>
                  <p className="font-bold text-lg text-red-700">4</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="p-2 bg-orange-100 rounded-md text-orange-700"><Home size={20}/></div>
                <div>
                  <p className="text-xs text-slate-500 text-orange-600/80">High-Risk Villages</p>
                  <p className="font-bold text-lg text-orange-700">12</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                <div className="p-2 bg-slate-200 rounded-md text-slate-700"><Navigation size={20}/></div>
                <div>
                  <p className="text-xs text-slate-500">Roads/Bridges at Risk</p>
                  <p className="font-bold text-lg text-slate-800">7 / 3</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex gap-4 text-xs">
              <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-600"/> <strong>2</strong> Safe Shelters</div>
              <div className="flex items-center gap-1"><ShieldCheck size={14} className="text-blue-600"/> <strong>1</strong> Hospital in Safe Zone</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6 & 7. DATA SOURCE HEALTH & QUICK ACTIONS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>System & Comm Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Core Internet</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">ONLINE</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> LoRaWAN Mesh</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">ACTIVE</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Local Siren Network</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">READY</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><XCircle size={16} className="text-red-500"/> Satellite Backup</span>
                <Badge variant="outline" className="bg-red-50 text-red-700">OFFLINE</Badge>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase">Data Sources</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Weather API</Badge>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">DEM Data</Badge>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Historical DB</Badge>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">GIS Engine</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col justify-center gap-2" asChild>
                <Link href="/admin/risk-map">
                  <MapPin className="text-blue-500"/>
                  <span className="text-xs">Live Map</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center gap-2" asChild>
                <Link href="/admin/alerts">
                  <ShieldAlert className="text-red-500"/>
                  <span className="text-xs">Manage Alerts</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center gap-2" asChild>
                <Link href="/admin/affected-areas">
                  <Users className="text-orange-500"/>
                  <span className="text-xs">Exposed Areas</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center gap-2" asChild>
                <Link href="/admin/reports">
                  <FileText className="text-slate-500"/>
                  <span className="text-xs">Field Reports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
