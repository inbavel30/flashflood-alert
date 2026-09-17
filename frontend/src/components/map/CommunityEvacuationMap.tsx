"use client";
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

import 'leaflet/dist/leaflet.css';
import { Badge } from '../ui/badge';
import { Navigation, Crosshair } from 'lucide-react';
import { Button } from '../ui/button';

interface Shelter {
  id: string;
  name: string;
  capacity: number;
  distance: number;
  lat: number;
  lng: number;
}

interface Village {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  flashFloodRisk: string;
  landslideRisk: string;
  combinedRisk: string;
  shelters?: Shelter[];
}

export default function CommunityEvacuationMap({ 
  village,
  highlightRoute,
  onMapReady
}: { 
  village: Village, 
  highlightRoute: boolean,
  onMapReady?: () => void
}) {
  const [mounted, setMounted] = useState(false);
  const [icons, setIcons] = useState<any>({});
  const mapRef = useRef<any>(null);

  useEffect(() => {
    import('leaflet').then(L => {
      // Fix default icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      const shelterIcon = L.divIcon({
        html: `<div style="background-color: #22c55e; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; border: 2px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.3);">🏠</div>`,
        className: 'custom-shelter-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      setIcons({ shelterIcon });
      setMounted(true);
      if (onMapReady) onMapReady();
    });
  }, [onMapReady]);

  // Handle focusing the route when highlightRoute changes
  useEffect(() => {
    if (mapRef.current && highlightRoute && village.shelters?.[0]) {
      const shelter = village.shelters[0];
      const bounds = [
        [village.lat, village.lng],
        [shelter.lat, shelter.lng]
      ];
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    } else if (mapRef.current) {
      mapRef.current.setView([village.lat, village.lng], 14);
    }
  }, [highlightRoute, village.lat, village.lng, village.shelters]);

  if (!mounted) return <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center">Loading Map...</div>;

  const shelter = village.shelters?.[0];
  
  // Safe Route (Green)
  const safeRoutePositions = shelter ? [
    [village.lat, village.lng],
    [(village.lat + shelter.lat) / 2 + 0.002, (village.lng + shelter.lng) / 2],
    [shelter.lat, shelter.lng]
  ] as [number, number][] : [];

  // Blocked Route (Red Dashed)
  const blockedRoutePositions = [
    [village.lat, village.lng],
    [village.lat - 0.015, village.lng - 0.015] // Arbitrary path away from shelter for visual effect
  ] as [number, number][];

  const handleUseMyLocation = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapRef.current.setView([position.coords.latitude, position.coords.longitude], 14);
        },
        () => {
          // fallback to village
          mapRef.current.setView([village.lat, village.lng], 14);
        }
      );
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer 
        center={[village.lat, village.lng]} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={false} // We will use default Leaflet or position it elsewhere, but it's fine
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Legend Overlay */}
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur p-3.5 rounded-xl shadow-lg z-[400] text-sm pointer-events-none border border-slate-200">
          <p className="font-black text-slate-800 mb-2.5 border-b pb-1.5 uppercase tracking-wide">MAP LEGEND</p>
          <div className="space-y-2 font-medium text-slate-700">
            <div className="flex items-center gap-2.5"><span className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-white shadow-sm"></span> You Are Here</div>
            <div className="flex items-center gap-2.5"><span className="w-5 h-1.5 bg-green-500 rounded-sm shadow-sm"></span> Safe Route</div>
            <div className="flex items-center gap-2.5"><span className="w-5 h-1.5 border-t-2 border-dashed border-red-500"></span> Blocked Route</div>
            <div className="flex items-center gap-2.5"><span className="w-3.5 h-3.5 rounded-full bg-green-500 border border-white flex items-center justify-center text-[8px] shadow-sm">🏠</span> Safe Shelter</div>
            <div className="flex items-center gap-2.5"><span className="w-3.5 h-3.5 bg-red-500/30 border border-red-500 rounded-sm"></span> High-Risk Area</div>
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-2 left-2 z-[400] flex flex-col gap-2">
          <Button onClick={handleUseMyLocation} variant="secondary" size="sm" className="bg-white/95 shadow-md text-xs h-9 px-3 flex items-center gap-1.5 hover:bg-white text-slate-800 font-bold rounded-lg border border-slate-200">
            <Crosshair size={16} /> Use My Location
          </Button>
        </div>

        {/* Hazard Area Overlay */}
        <Circle 
          center={[village.lat, village.lng]}
          radius={600}
          pathOptions={{ fillColor: '#ef4444', fillOpacity: 0.15, color: '#ef4444', weight: 1, dashArray: '4, 4' }}
        />

        {/* Safe Route */}
        {shelter && (
          <Polyline 
            positions={safeRoutePositions} 
            color="#22c55e" 
            weight={highlightRoute ? 8 : 6} 
            className={highlightRoute ? "animate-pulse" : ""}
          >
            <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-green-800 text-lg font-black opacity-90 drop-shadow-md">
              ▼
            </Tooltip>
            <Popup>
              <div className="p-1 min-w-[200px]">
                <p className="font-bold text-green-700 text-sm mb-1 uppercase tracking-wide">SAFE EVACUATION ROUTE</p>
                <div className="text-xs text-slate-700 space-y-1.5 mb-2 mt-2">
                  <div className="flex justify-between"><span>From:</span><span className="font-bold">{village.name}</span></div>
                  <div className="flex justify-between"><span>To:</span><span className="font-bold">{shelter.name}</span></div>
                  <div className="flex justify-between"><span>Distance:</span><span className="font-bold">{shelter.distance} km</span></div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-green-100">
                  <span className="text-xs font-bold text-slate-600">Route Status:</span>
                  <Badge variant="success" className="text-[10px]">SAFE</Badge>
                </div>
              </div>
            </Popup>
          </Polyline>
        )}

        {/* Blocked Route */}
        <Polyline positions={blockedRoutePositions} color="#ef4444" weight={5} dashArray="8, 8">
          <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-red-800 text-lg font-black opacity-90 drop-shadow-md">
            ✕
          </Tooltip>
          <Popup>
            <div className="p-1 min-w-[200px]">
              <p className="font-bold text-red-700 text-sm mb-1 uppercase tracking-wide">BLOCKED ROUTE</p>
              <div className="text-xs text-slate-700 space-y-1.5 mb-2 mt-2">
                <div className="flex justify-between"><span>Route:</span><span className="font-bold">Lower Valley Road</span></div>
                <div className="flex justify-between items-center"><span>Status:</span><Badge variant="destructive" className="text-[10px]">BLOCKED</Badge></div>
              </div>
              <p className="text-xs text-slate-600 border-t pt-2 mt-1">
                <span className="font-bold text-slate-800">Reason:</span> Potential landslide debris. Avoid this route.
              </p>
            </div>
          </Popup>
        </Polyline>

        {/* Village Marker (You Are Here) */}
        <CircleMarker
          center={[village.lat, village.lng]}
          radius={14}
          pathOptions={{ 
            fillColor: '#3b82f6',
            fillOpacity: 0.9,
            color: 'white',
            weight: 3
          }}
        >
          <Popup>
            <div className="p-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">📍</span>
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">YOU ARE HERE</h3>
              </div>
              <p className="font-bold text-lg text-blue-600 mt-1 mb-1">{village.name}</p>
              <p className="text-xs text-slate-500 mb-2">{village.district}, Uttarakhand</p>
              
              <div className="bg-red-50 border border-red-100 p-2 rounded-md mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-red-800 uppercase">Risk Area:</span>
                  <Badge variant={village.combinedRisk === 'CRITICAL' ? 'destructive' : 'warning'} className="text-[10px]">{village.combinedRisk}</Badge>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>

        {/* Shelter Marker */}
        {shelter && (
          <Marker position={[shelter.lat, shelter.lng]} icon={icons.shelterIcon}>
            <Popup>
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2 border-b pb-2">
                  <h3 className="font-black text-sm text-green-700 uppercase tracking-wide leading-tight">SAFE SHELTER</h3>
                </div>
                <p className="font-bold text-base text-slate-900 mb-2">{shelter.name}</p>
                <div className="text-xs text-slate-700 space-y-1.5 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-500">Status:</span>
                    <Badge variant="success" className="text-[10px]">OPEN</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">Distance:</span>
                    <span className="font-bold">{shelter.distance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-500">Capacity:</span>
                    <span className="font-bold">{shelter.capacity} people</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
