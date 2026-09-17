"use client";
import { useStore } from "@/store/useStore";
import { AlertTriangle, Navigation, MapPin, Clock, Map, ChevronRight, Users, Car, Building2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MyArea() {
  const { villages, selectedCommunityVillageId } = useStore();
  const myVillage = villages.find(v => v.id === selectedCommunityVillageId) || villages[0];
  const router = useRouter();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10 w-full">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 leading-tight">Your Area</h1>
          <p className="text-base text-slate-500 mt-1">
            Current risk assessment for <span className="font-semibold text-slate-800">{myVillage.name}</span>
          </p>
        </div>
        
        <div 
          className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between sm:w-72" 
          onClick={() => router.push('/community/alerts')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Update Your Location</p>
              <p className="text-xs text-slate-500">Get alerts for your area</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </div>
      </div>

      {/* CRITICAL RISK PANEL */}
      <div className="border border-red-200 bg-red-50/70 rounded-[14px] shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3.5 text-red-600 mb-4">
          <AlertTriangle className="h-8 w-8 shrink-0" />
          <h2 className="text-[24px] font-bold uppercase tracking-wide leading-tight">
            CRITICAL FLASH FLOOD RISK
          </h2>
        </div>
        
        <p className="text-lg text-slate-800 mb-8 max-w-3xl">
          Heavy rainfall and saturated ground are increasing flood risk rapidly in your area.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* EARLY WARNING WINDOW */}
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex items-start gap-4 h-full">
            <div className="p-3 bg-red-50 text-red-600 rounded-full shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 font-medium mb-1">Early Warning Window</p>
              <p className="text-2xl font-bold text-slate-900 truncate">{myVillage.warningWindow}</p>
            </div>
          </div>

          {/* NEAREST SAFE SHELTER */}
          <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm flex items-start gap-4 h-full">
            <div className="p-3 bg-green-50 text-green-600 rounded-full shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 font-medium mb-1">Nearest Safe Shelter</p>
              <p className="text-xl font-bold text-slate-900 truncate">{myVillage.shelters[0]?.name}</p>
              <p className="text-sm text-slate-600 mt-0.5">{myVillage.shelters[0]?.distance} km away</p>
            </div>
          </div>
        </div>

        <div className="border-t border-red-200 pt-6 mt-2">
          <p className="text-sm font-bold text-red-800 uppercase tracking-widest mb-3">ACTION REQUIRED</p>
          <h3 className="text-[28px] font-black text-red-700 mb-6 uppercase">EVACUATE NOW</h3>
          <Button 
            onClick={() => router.push('/community/evacuation')} 
            className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto px-8 h-14 rounded-xl text-lg font-medium shadow-md transition-all gap-2.5"
          >
            <Navigation className="h-5 w-5" /> View Safer Route
          </Button>
        </div>
      </div>

      {/* LOCAL INFORMATION SECTION */}
      <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Local Information</h2>
          <p className="text-sm text-slate-500 mt-1">Key details for your area</p>
        </div>
        
        <div className="p-6 bg-slate-50/50">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2 h-full">
              <Users className="h-5 w-5 text-blue-500" />
              <p className="text-sm font-medium text-slate-500">Population</p>
              <p className="text-2xl font-bold text-slate-800">{myVillage.population.toLocaleString()}</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2 h-full">
              <Car className="h-5 w-5 text-orange-500" />
              <p className="text-sm font-medium text-slate-500">Roads at Risk</p>
              <p className="text-2xl font-bold text-slate-800">{myVillage.infrastructure.roads}</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2 h-full">
              <Map className="h-5 w-5 text-amber-500" />
              <p className="text-sm font-medium text-slate-500">Bridges at Risk</p>
              <p className="text-2xl font-bold text-slate-800">{myVillage.infrastructure.bridges}</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2 h-full">
              <Building2 className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-medium text-slate-500">Schools</p>
              <p className="text-2xl font-bold text-slate-800">{myVillage.infrastructure.schools}</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2 h-full">
              <Building className="h-5 w-5 text-rose-500" />
              <p className="text-sm font-medium text-slate-500">Hospitals</p>
              <p className="text-2xl font-bold text-slate-800">{myVillage.infrastructure.hospitals}</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
