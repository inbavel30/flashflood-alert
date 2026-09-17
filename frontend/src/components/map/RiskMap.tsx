"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

import 'leaflet/dist/leaflet.css';
import { useStore } from '@/store/useStore';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AlertTriangle, MapPin, Navigation } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'LOW': return '#22c55e'; // green-500
    case 'MODERATE': return '#eab308'; // yellow-500
    case 'HIGH': return '#f97316'; // orange-500
    case 'CRITICAL': return '#ef4444'; // red-500
    default: return '#94a3b8'; // slate-400
  }
};

export default function RiskMap({ role }: { role: 'PUBLIC' | 'ADMIN' | 'EMERGENCY_AUTHORITY' }) {
  const { villages, selectedVillageId, setSelectedVillageId } = useStore();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const locationQuery = searchParams.get('location');

  useEffect(() => {
    // Fix leaflet icons issue
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

  useEffect(() => {
    if (locationQuery) {
      const v = villages.find(vil => vil.name.toLowerCase() === locationQuery.toLowerCase());
      if (v && v.id !== selectedVillageId) {
        setSelectedVillageId(v.id);
      }
    }
  }, [locationQuery, villages, selectedVillageId, setSelectedVillageId]);

  if (!mounted) return <div className="h-[600px] w-full bg-slate-100 animate-pulse rounded-xl border flex items-center justify-center">Loading Map...</div>;

  let mapCenter: [number, number] = [30.5, 79.5];
  let mapZoom = 9;

  if (locationQuery) {
    const v = villages.find(vil => vil.name.toLowerCase() === locationQuery.toLowerCase());
    if (v) {
      mapCenter = [v.lat, v.lng];
      mapZoom = 13;
    }
  }

  return (
    <div className="h-[600px] w-full relative rounded-xl overflow-hidden border border-slate-300 shadow-sm z-0">
      <MapContainer key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`} center={mapCenter} zoom={mapZoom} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {villages.map(village => (
          <CircleMarker
            key={village.id}
            center={[village.lat, village.lng]}
            radius={12}
            pathOptions={{ 
              color: getRiskColor(village.combinedRisk),
              fillColor: getRiskColor(village.combinedRisk),
              fillOpacity: 0.7,
              weight: 2
            }}
            ref={locationQuery === village.name ? (el: any) => { if (el) { setTimeout(() => el.openPopup(), 100); } } : null}
            eventHandlers={{
              click: () => setSelectedVillageId(village.id),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[260px]">
                <div className="border-b pb-2 mb-2">
                  <h3 className="font-bold text-lg leading-tight">{village.name}</h3>
                  <p className="text-xs text-slate-500">{village.district}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-sm mb-3">
                  <span className="text-slate-600">Hazard</span>
                  <span className="font-semibold text-right">
                    {village.flashFloodRisk === 'CRITICAL' && village.landslideRisk === 'CRITICAL' ? 'FLASH FLOOD + LANDSLIDE' : 
                     village.flashFloodRisk === 'CRITICAL' || village.flashFloodRisk === 'HIGH' ? 'FLASH FLOOD' : 'LANDSLIDE'}
                  </span>
                  
                  <span className="text-slate-600">Combined Risk</span>
                  <div className="text-right">
                    <Badge variant={village.combinedRisk === 'CRITICAL' ? 'destructive' : village.combinedRisk === 'HIGH' ? 'high' : village.combinedRisk === 'MODERATE' ? 'warning' : 'success'}>
                      {village.combinedRisk}
                    </Badge>
                  </div>
                  
                  <span className="text-slate-600">Early Warning</span>
                  <span className="font-bold text-red-600 text-right">{village.warningWindow}</span>
                  
                  <span className="text-slate-600">Population</span>
                  <span className="font-semibold text-right">{village.population.toLocaleString()}</span>
                </div>
                
                {role === 'PUBLIC' ? (
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2 mt-2">
                    <Navigation size={16} /> View Evacuation Route
                  </Button>
                ) : (
                  <div className="flex gap-2 mt-3 pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => router.push(`/admin/affected-areas?location=${encodeURIComponent(village.name)}`)}
                    >
                      <MapPin size={14} /> View Area
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => router.push(`/admin/alerts?location=${encodeURIComponent(village.name)}`)}
                    >
                      <AlertTriangle size={14} /> View Alert
                    </Button>
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Render Shelters */}
        {villages.flatMap(v => v.shelters).map(shelter => (
          <Marker key={shelter.id} position={[shelter.lat, shelter.lng]}>
             <Popup>
               <div className="p-2">
                 <h4 className="font-bold flex items-center gap-2"><MapPin size={16} className="text-green-600" /> {shelter.name}</h4>
                 <p className="text-sm mt-1">Capacity: {shelter.capacity} people</p>
                 <p className="text-sm text-green-700 font-medium mt-1">Safe Shelter</p>
               </div>
             </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md border z-[400]">
        <h4 className="font-semibold text-sm mb-2">Risk Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical Risk</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> High Risk</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Moderate Risk</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Low Risk</div>
        </div>
      </div>
    </div>
  );
}
