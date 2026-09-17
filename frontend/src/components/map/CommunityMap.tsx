"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

import 'leaflet/dist/leaflet.css';
import { useStore } from '@/store/useStore';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AlertTriangle, Navigation, MapPin, Home, ShieldAlert } from 'lucide-react';

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'LOW': return '#22c55e'; // green-500
    case 'MODERATE': return '#eab308'; // yellow-500
    case 'HIGH': return '#f97316'; // orange-500
    case 'CRITICAL': return '#ef4444'; // red-500
    default: return '#94a3b8'; // slate-400
  }
};

export default function CommunityMap() {
  const { villages, selectedCommunityVillageId, setSelectedCommunityVillageId, alerts } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const [riskFilter, setRiskFilter] = useState('All');
  const [hazardFilter, setHazardFilter] = useState('All');

  useEffect(() => {
    import('leaflet').then(L => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setMounted(true);
    });
  }, []);

  if (!mounted) return <div className="h-[600px] w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center">Loading Map...</div>;

  const filteredVillages = villages.filter(v => {
    if (riskFilter !== 'All' && v.combinedRisk !== riskFilter.toUpperCase()) return false;
    
    if (hazardFilter !== 'All') {
      if (hazardFilter === 'Combined' && !(v.flashFloodRisk === 'CRITICAL' && v.landslideRisk === 'CRITICAL')) return false;
      if (hazardFilter === 'Flash Flood' && v.flashFloodRisk !== 'CRITICAL' && v.flashFloodRisk !== 'HIGH') return false;
      if (hazardFilter === 'Landslide' && v.landslideRisk !== 'CRITICAL' && v.landslideRisk !== 'HIGH') return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 bg-slate-50 p-3 rounded-md border">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Risk Filter</label>
          <select className="border p-2 rounded text-sm min-w-[120px]" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            <option value="All">All Risks</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Hazard Filter</label>
          <select className="border p-2 rounded text-sm min-w-[120px]" value={hazardFilter} onChange={e => setHazardFilter(e.target.value)}>
            <option value="All">All Hazards</option>
            <option value="Flash Flood">Flash Flood</option>
            <option value="Landslide">Landslide</option>
            <option value="Combined">Combined</option>
          </select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden relative shadow-sm">
        <MapContainer 
          center={[30.5, 79.3]} 
          zoom={10} 
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredVillages.map(village => {
            const hasAlert = alerts.some(a => a.villageId === village.id && a.status === 'ACTIVE');
            
            // Draw a mock safe route from village to its first shelter
            const shelter = village.shelters?.[0];
            const routePositions = shelter ? [
              [village.lat, village.lng],
              [(village.lat + shelter.lat) / 2 + 0.005, (village.lng + shelter.lng) / 2],
              [shelter.lat, shelter.lng]
            ] as [number, number][] : [];

            return (
              <div key={village.id}>
                {/* Safe Route Polyline */}
                {shelter && village.id === selectedCommunityVillageId && (
                  <Polyline positions={routePositions} color="#22c55e" weight={4} dashArray="5, 10" />
                )}

                {/* Village Marker */}
                <CircleMarker
                  center={[village.lat, village.lng]}
                  radius={village.id === selectedCommunityVillageId ? 12 : 8}
                  pathOptions={{ 
                    fillColor: getRiskColor(village.combinedRisk),
                    fillOpacity: 0.8,
                    color: village.id === selectedCommunityVillageId ? '#000' : 'white',
                    weight: village.id === selectedCommunityVillageId ? 3 : 2
                  }}
                  eventHandlers={{
                    click: () => setSelectedCommunityVillageId(village.id),
                  }}
                >
                  <Popup className="community-popup">
                    <div className="p-1 min-w-[240px]">
                      <h3 className="font-bold text-lg text-slate-900 uppercase tracking-wide">{village.name}</h3>
                      <p className="text-xs text-slate-500 mb-3">{village.district}, Uttarakhand</p>
                      
                      <div className="bg-slate-50 border p-3 rounded-md mb-3">
                        <div className="flex items-center justify-between mb-2 border-b pb-2">
                          <span className="text-xs font-bold text-slate-500">CURRENT RISK:</span>
                          <Badge variant={village.combinedRisk === 'CRITICAL' ? 'destructive' : village.combinedRisk === 'HIGH' ? 'high' : village.combinedRisk === 'MODERATE' ? 'warning' : 'success'}>
                            {village.combinedRisk}
                          </Badge>
                        </div>
                        
                        <div className="text-sm space-y-2 mb-3">
                          <div>
                            <span className="text-slate-500 font-medium">Hazard:</span>
                            <span className="font-bold block text-slate-800">
                              {village.flashFloodRisk === 'CRITICAL' && village.landslideRisk === 'CRITICAL' ? 'Flash Flood + Landslide' : 
                               village.flashFloodRisk === 'CRITICAL' || village.flashFloodRisk === 'HIGH' ? 'Flash Flood' : 'Landslide'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium">Early Warning Window:</span>
                            <span className="font-bold text-red-600 block">{village.warningWindow}</span>
                            <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">Estimated potential lead time for preparedness and emergency response.</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium">Current Situation:</span>
                            <span className="text-slate-700 block italic leading-tight mt-1">
                              {village.combinedRisk === 'CRITICAL' ? 'Heavy rainfall and saturated ground conditions are contributing to elevated flood and landslide risk.' : 'Conditions are being monitored.'}
                            </span>
                          </div>
                        </div>

                        <div className="bg-red-100 p-2 rounded text-center">
                          <p className="text-xs font-bold text-red-800 mb-1">Recommended Action:</p>
                          <p className="font-black text-red-700 uppercase">
                            {village.combinedRisk === 'CRITICAL' ? 'PREPARE TO EVACUATE' : 'Monitor Updates'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {hasAlert && (
                          <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => router.push('/community/alerts')}>View Alert</Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => router.push('/community/evacuation')}>Find Shelter</Button>
                        <Button size="sm" className="col-span-2 bg-blue-600 hover:bg-blue-700 text-xs h-8" onClick={() => router.push('/community/evacuation')}>
                          <Navigation size={14} className="mr-1"/> View Safe Route
                        </Button>
                        <Button size="sm" variant="secondary" className="col-span-2 text-xs h-8" onClick={() => router.push('/community/safety')}>Emergency Guidance</Button>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>

                {/* Shelter Markers */}
                {village.shelters?.map(shelter => (
                  <Marker key={shelter.id} position={[shelter.lat, shelter.lng]}>
                    <Popup>
                      <div className="p-1 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2 border-b pb-2">
                          <Home size={18} className="text-green-600" />
                          <h3 className="font-bold text-sm text-slate-800">{shelter.name}</h3>
                        </div>
                        <div className="text-sm space-y-2 mb-3">
                          <div className="flex justify-between"><span className="text-slate-500">Status:</span><Badge variant="success">OPEN</Badge></div>
                          <div className="flex justify-between"><span className="text-slate-500">Capacity:</span><span className="font-bold">{shelter.capacity} people</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Distance:</span><span className="font-bold">{shelter.distance} km</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Route Status:</span><span className="font-bold text-green-600">SAFE</span></div>
                        </div>
                        <div className="grid gap-2">
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 h-8 text-xs" onClick={() => router.push('/community/evacuation')}><Navigation size={14} className="mr-1"/> Get Directions</Button>
                          <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => router.push('/community/evacuation')}>View Shelter</Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </div>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
