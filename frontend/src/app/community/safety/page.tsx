"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall, ShieldAlert, CloudRain, Mountain, BriefcaseMedical, X } from "lucide-react";
import { useState, useEffect } from "react";

const EMERGENCY_ITEMS = [
  "Drinking Water",
  "Dry Food",
  "Torch",
  "Spare Batteries",
  "First-Aid Supplies",
  "Essential Medicines",
  "Mobile Phone",
  "Power Bank",
  "Important Documents",
  "Basic Clothing",
  "Whistle",
  "Emergency Contact List"
];

function ChecklistModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('communityEmergencyKitChecklist');
      if (saved) {
        try {
          setCheckedItems(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('communityEmergencyKitChecklist', JSON.stringify(checkedItems));
    }
  }, [checkedItems]);

  if (!isOpen) return null;

  const handleToggle = (item: string) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / EMERGENCY_ITEMS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-green-800">
            <BriefcaseMedical size={24} />
            <div>
              <h2 className="text-xl font-bold">Emergency Kit Checklist</h2>
              <p className="text-xs text-slate-500 font-medium">Essential items to keep ready before an emergency.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b bg-slate-50">
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm font-bold text-slate-700">Checklist Progress</p>
            <p className="text-sm font-semibold text-green-700">{checkedCount} / {EMERGENCY_ITEMS.length} items prepared</p>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid gap-2 sm:grid-cols-2">
            {EMERGENCY_ITEMS.map(item => (
              <label 
                key={item} 
                className={`flex items-start gap-3 p-3 border rounded-md cursor-pointer transition-colors ${checkedItems[item] ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50'}`}
              >
                <input 
                  type="checkbox" 
                  className="mt-0.5 w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500 accent-green-600"
                  checked={!!checkedItems[item]}
                  onChange={() => handleToggle(item)}
                />
                <span className={`text-sm font-medium ${checkedItems[item] ? 'text-green-800' : 'text-slate-700'}`}>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-between gap-4">
          <Button variant="outline" onClick={resetChecklist} className="text-slate-600">Reset Checklist</Button>
          <Button onClick={onClose} className="bg-slate-800 hover:bg-slate-900">Close</Button>
        </div>
      </div>
    </div>
  );
}

export default function CommunitySafety() {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      
      <ChecklistModal isOpen={isChecklistOpen} onClose={() => setIsChecklistOpen(false)} />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Safety & Preparedness</h1>
        <p className="text-slate-500">Know what to do before, during, and after flash floods and landslides.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT/CENTER COLUMNS: SAFETY GUIDANCE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* FLASH FLOODS */}
          <Card className="border-blue-200 shadow-sm overflow-hidden">
            <div className="bg-blue-600 text-white p-3 flex items-center gap-2">
              <CloudRain size={20} />
              <h2 className="font-bold tracking-wide">FLASH FLOOD SAFETY</h2>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
              <div className="p-5">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><ShieldAlert size={16}/> BEFORE A FLASH FLOOD</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Keep emergency documents protected.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Keep drinking water ready.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Charge your mobile phone.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Keep a torch and spare batteries available.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Prepare essential medicines.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Identify the nearest safe shelter.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Know the recommended evacuation route.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Keep emergency contacts accessible.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Move important belongings to a safer location.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Follow official warnings.</li>
                </ul>
              </div>
              <div className="p-5 bg-blue-50/30">
                <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2"><ShieldAlert size={16}/> DURING A FLASH FLOOD</h3>
                <ul className="space-y-3 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Move to higher and safer ground.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Follow evacuation instructions.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Stay away from rivers and fast-flowing water.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Do not walk or drive through floodwater.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Avoid bridges and low-lying roads when warned.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Do not touch electrical equipment in flooded areas.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Keep your phone available for emergency alerts.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Stay inside a safe building if evacuation is not yet instructed.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Follow the designated safe route.</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* LANDSLIDES */}
          <Card className="border-amber-700 shadow-sm overflow-hidden">
            <div className="bg-amber-800 text-white p-3 flex items-center gap-2">
              <Mountain size={20} />
              <h2 className="font-bold tracking-wide">LANDSLIDE SAFETY</h2>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
              <div className="p-5">
                <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2"><ShieldAlert size={16}/> BEFORE A LANDSLIDE</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Monitor official warnings.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Stay alert during prolonged or heavy rainfall.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Identify safe areas away from steep slopes.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Keep emergency supplies ready.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Know the nearest evacuation route.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Keep children and vulnerable people prepared to move.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Avoid parking or staying near unstable slopes.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></div> Report visible cracks, falling rocks or unusual ground movement.</li>
                </ul>
              </div>
              <div className="p-5 bg-amber-50/30">
                <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2"><ShieldAlert size={16}/> DURING A LANDSLIDE</h3>
                <ul className="space-y-3 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Move away from the slope immediately when instructed.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Do not approach an active landslide.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Avoid roads affected by falling rocks or debris.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Move to stable ground.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Follow emergency authority instructions.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div> Do not return to the affected area until authorities declare it safe.</li>
                </ul>
              </div>
            </div>
          </Card>

        </div>

        {/* RIGHT COLUMN: KIT & CONTACTS */}
        <div className="space-y-6">
          
          {/* EMERGENCY KIT */}
          <Card className="shadow-sm border-green-200">
            <CardHeader className="bg-green-50 pb-3 border-b border-green-100">
              <CardTitle className="text-lg flex items-center gap-2 text-green-800"><BriefcaseMedical size={20}/> Emergency Kit</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <ul className="space-y-2 text-sm font-medium text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Drinking Water</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Dry Food</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Torch</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Batteries</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> First-Aid Supplies</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Essential Medicines</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Mobile Phone</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Power Bank</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Important Documents</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Basic Clothing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Whistle</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Emergency Contact List</li>
              </ul>
              <Button onClick={() => setIsChecklistOpen(true)} className="w-full mt-5 bg-green-600 hover:bg-green-700">View Emergency Kit Checklist</Button>
            </CardContent>
          </Card>

          {/* EMERGENCY CONTACTS */}
          <Card className="shadow-sm border-red-200 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-red-700"><PhoneCall size={20}/> Emergency Services</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              
              <a href="tel:112" className="flex items-center justify-between border-b border-red-100 pb-3 hover:bg-red-100 p-2 -mx-2 rounded transition-colors group">
                <div>
                  <p className="font-bold text-xl text-red-700 group-hover:text-red-800">112</p>
                  <p className="text-xs font-medium text-slate-600">National Emergency Number</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:bg-red-700 shadow-sm"><PhoneCall size={18}/></div>
              </a>
              
              <a href="tel:1070" className="flex items-center justify-between border-b border-red-100 pb-3 hover:bg-red-100 p-2 -mx-2 rounded transition-colors group">
                <div>
                  <p className="font-bold text-xl text-red-700 group-hover:text-red-800">1070</p>
                  <p className="text-xs font-medium text-slate-600">Disaster Management Helpline</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:bg-red-700 shadow-sm"><PhoneCall size={18}/></div>
              </a>

              <a href="tel:108" className="flex items-center justify-between border-b border-red-100 pb-3 hover:bg-red-100 p-2 -mx-2 rounded transition-colors group">
                <div>
                  <p className="font-bold text-xl text-red-700 group-hover:text-red-800">108</p>
                  <p className="text-xs font-medium text-slate-600">Emergency Medical Service</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:bg-red-700 shadow-sm"><PhoneCall size={18}/></div>
              </a>

              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-semibold flex justify-between items-center">Police <a href="tel:100" className="text-blue-600 hover:underline">100</a></p>
                <p className="text-sm font-semibold flex justify-between items-center">Fire & Rescue <a href="tel:101" className="text-blue-600 hover:underline">101</a></p>
                <p className="text-sm font-semibold flex justify-between items-center">Ambulance <a href="tel:102" className="text-blue-600 hover:underline">102</a></p>
              </div>

              <div className="bg-red-100 p-3 rounded text-sm text-center font-medium text-red-800 mt-2">
                <p>District Emergency Control Room</p>
                <p className="text-xs font-normal mt-1 italic opacity-80">Contact your local district emergency control room.</p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}