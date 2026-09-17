import { create } from 'zustand';

export type Role = 'PUBLIC' | 'ADMIN' | 'EMERGENCY_AUTHORITY' | null;

export interface Village {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  flashFloodRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  landslideRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  combinedRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  confidence: number;
  warningWindow: string;
  population: number;
  infrastructure: {
    roads: number;
    bridges: number;
    schools: number;
    hospitals: number;
  };
  shelters: Shelter[];
  responseStatus: 'Monitoring' | 'Action Required' | 'Evacuation Prepared' | 'Evacuation Active' | 'Resolved';
}

export interface Shelter {
  id: string;
  name: string;
  capacity: number;
  distance: number;
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  villageId: string;
  hazard: string;
  severity: 'WATCH' | 'WARNING' | 'CRITICAL';
  status: 'ACTIVE' | 'RESOLVED' | 'ACKNOWLEDGED' | 'ESCALATED';
  timestamp: string;
  reason: string;
  action: string;
}

export interface Sensor {
  id: string;
  villageId: string;
  node: string;
  rainfall: number;
  soilMoisture: number;
  tilt: number;
  environment: string;
  battery: number;
  status: 'ONLINE' | 'OFFLINE';
  lastUpdate: string;
}


export interface HistoryEvent {
  id: string;
  villageId: string;
  hazard: string;
  risk: string;
  time: string;
  outcome: string;
  action?: string;
  user?: string;
  previousStatus?: string;
  newStatus?: string;
}

export interface FieldReport {
  id: string;
  villageId: string;
  reporter: string;
  time: string;
  hazard: string;
  eventStatus: 'Pending Review' | 'Event Confirmed' | 'Partial Impact' | 'False Alarm';
  reviewStatus: 'Pending' | 'Reviewed';
  eventDetails: string;
  currentObservations: string[];
  photoUrl?: string;
  gps: string;
  observerNotes: string;
  relatedAlertId?: string;
  relatedPredictionId?: string;
  reviewNotes: string;
}

export interface Prediction {
  id: string;
  villageId: string;
  predictedHazard: string;
  risk: 'Critical' | 'High' | 'Moderate' | 'Low';
  fieldObservation: string;
  result: 'CONFIRMED' | 'PARTIAL' | 'FALSE ALARM' | 'PENDING';
  predictionTime: string;
  fieldConfirmationTime: string;
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  
  villages: Village[];
  alerts: Alert[];
  sensors: Sensor[];
  historyEvents: HistoryEvent[];
  fieldReports: FieldReport[];
  predictions: Prediction[];
  
  selectedVillageId: string | null;
  setSelectedVillageId: (id: string | null) => void;
  selectedCommunityVillageId: string | null;
  setSelectedCommunityVillageId: (id: string | null) => void;
  
  updateFieldReportStatus: (id: string, status: FieldReport['eventStatus']) => void;
  updateAlertStatus: (id: string, status: Alert['status']) => void;
  updateVillageResponseStatus: (id: string, status: Village['responseStatus']) => void;
  addHistoryEvent: (event: HistoryEvent) => void;
  fetchDashboardData: () => Promise<void>;
}

const mockVillages: Village[] = [
  {
    id: 'v1', name: 'Gaurikund', district: 'Rudraprayag', lat: 30.634, lng: 78.995,
    flashFloodRisk: 'CRITICAL', landslideRisk: 'CRITICAL', combinedRisk: 'CRITICAL',
    confidence: 89, warningWindow: '12 HOURS', population: 2800,
    infrastructure: { roads: 4, bridges: 2, schools: 2, hospitals: 1 },
    responseStatus: 'Action Required',
    shelters: [{ id: 's1', name: 'Gaurikund Temple Complex', capacity: 800, distance: 0.5, lat: 30.635, lng: 78.996 }]
  },
  {
    id: 'v2', name: 'Rambara', district: 'Rudraprayag', lat: 30.680, lng: 79.030,
    flashFloodRisk: 'CRITICAL', landslideRisk: 'HIGH', combinedRisk: 'CRITICAL',
    confidence: 91, warningWindow: '13 HOURS', population: 1950,
    infrastructure: { roads: 3, bridges: 2, schools: 1, hospitals: 0 },
    responseStatus: 'Evacuation Prepared',
    shelters: [{ id: 's2', name: 'Rambara GMVN Shelter', capacity: 400, distance: 0.8, lat: 30.681, lng: 79.031 }]
  },
  {
    id: 'v3', name: 'Kalimath', district: 'Rudraprayag', lat: 30.575, lng: 79.052,
    flashFloodRisk: 'HIGH', landslideRisk: 'HIGH', combinedRisk: 'HIGH',
    confidence: 85, warningWindow: '16 HOURS', population: 1750,
    infrastructure: { roads: 3, bridges: 1, schools: 1, hospitals: 1 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's3', name: 'Kalimath Govt School', capacity: 350, distance: 1.2, lat: 30.576, lng: 79.053 }]
  },
  {
    id: 'v4', name: 'Semi', district: 'Rudraprayag', lat: 30.550, lng: 79.060,
    flashFloodRisk: 'MODERATE', landslideRisk: 'HIGH', combinedRisk: 'HIGH',
    confidence: 82, warningWindow: '17 HOURS', population: 1420,
    infrastructure: { roads: 2, bridges: 1, schools: 1, hospitals: 0 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's4', name: 'Semi Community Hall', capacity: 250, distance: 1.0, lat: 30.551, lng: 79.061 }]
  },
  {
    id: 'v5', name: 'Chandrapuri', district: 'Rudraprayag', lat: 30.432, lng: 79.020,
    flashFloodRisk: 'HIGH', landslideRisk: 'MODERATE', combinedRisk: 'HIGH',
    confidence: 87, warningWindow: '15 HOURS', population: 2100,
    infrastructure: { roads: 3, bridges: 1, schools: 2, hospitals: 1 },
    responseStatus: 'Action Required',
    shelters: [{ id: 's5', name: 'Chandrapuri Inter College', capacity: 600, distance: 1.5, lat: 30.433, lng: 79.021 }]
  },
  {
    id: 'v6', name: 'Agastmuni', district: 'Rudraprayag', lat: 30.380, lng: 79.015,
    flashFloodRisk: 'MODERATE', landslideRisk: 'MODERATE', combinedRisk: 'MODERATE',
    confidence: 78, warningWindow: '22 HOURS', population: 2400,
    infrastructure: { roads: 2, bridges: 1, schools: 2, hospitals: 1 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's6', name: 'Agastmuni Sports Complex', capacity: 1000, distance: 2.0, lat: 30.381, lng: 79.016 }]
  },
  {
    id: 'v7', name: 'Tapovan', district: 'Chamoli', lat: 30.485, lng: 79.620,
    flashFloodRisk: 'CRITICAL', landslideRisk: 'CRITICAL', combinedRisk: 'CRITICAL',
    confidence: 93, warningWindow: '12 HOURS', population: 2300,
    infrastructure: { roads: 4, bridges: 2, schools: 1, hospitals: 1 },
    responseStatus: 'Action Required',
    shelters: [{ id: 's7', name: 'Tapovan NHPC Camp', capacity: 1200, distance: 0.7, lat: 30.486, lng: 79.621 }]
  },
  {
    id: 'v8', name: 'Lata', district: 'Chamoli', lat: 30.510, lng: 79.730,
    flashFloodRisk: 'MODERATE', landslideRisk: 'CRITICAL', combinedRisk: 'CRITICAL',
    confidence: 90, warningWindow: '14 HOURS', population: 1300,
    infrastructure: { roads: 2, bridges: 1, schools: 1, hospitals: 0 },
    responseStatus: 'Evacuation Prepared',
    shelters: [{ id: 's8', name: 'Lata Village Panchayat', capacity: 300, distance: 0.5, lat: 30.511, lng: 79.731 }]
  },
  {
    id: 'v9', name: 'Pipalkoti', district: 'Chamoli', lat: 30.435, lng: 79.420,
    flashFloodRisk: 'MODERATE', landslideRisk: 'HIGH', combinedRisk: 'HIGH',
    confidence: 84, warningWindow: '18 HOURS', population: 1500,
    infrastructure: { roads: 2, bridges: 1, schools: 1, hospitals: 1 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's9', name: 'Pipalkoti Relief Center', capacity: 500, distance: 1.1, lat: 30.436, lng: 79.421 }]
  },
  {
    id: 'v10', name: 'Nautha', district: 'Chamoli', lat: 30.290, lng: 79.350,
    flashFloodRisk: 'LOW', landslideRisk: 'MODERATE', combinedRisk: 'MODERATE',
    confidence: 75, warningWindow: '24 HOURS', population: 930,
    infrastructure: { roads: 1, bridges: 0, schools: 1, hospitals: 0 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's10', name: 'Nautha Primary School', capacity: 200, distance: 0.8, lat: 30.291, lng: 79.351 }]
  }
];

const mockSensors: Sensor[] = [
  { id: 'sen1', villageId: 'v1', node: 'UK-001', rainfall: 54, soilMoisture: 87, tilt: 3.8, environment: 'Heavy Rain', battery: 91, status: 'ONLINE', lastUpdate: '09:42 AM' },
  { id: 'sen2', villageId: 'v2', node: 'UK-002', rainfall: 61, soilMoisture: 91, tilt: 4.6, environment: 'Heavy Rain', battery: 86, status: 'ONLINE', lastUpdate: '09:42 AM' },
  { id: 'sen3', villageId: 'v3', node: 'UK-003', rainfall: 46, soilMoisture: 82, tilt: 3.1, environment: 'Heavy Rain', battery: 89, status: 'ONLINE', lastUpdate: '09:41 AM' },
  { id: 'sen4', villageId: 'v4', node: 'UK-004', rainfall: 39, soilMoisture: 78, tilt: 2.7, environment: 'Rain', battery: 94, status: 'ONLINE', lastUpdate: '09:41 AM' },
  { id: 'sen5', villageId: 'v5', node: 'UK-005', rainfall: 43, soilMoisture: 80, tilt: 2.4, environment: 'Rain', battery: 88, status: 'ONLINE', lastUpdate: '09:40 AM' },
  { id: 'sen6', villageId: 'v6', node: 'UK-006', rainfall: 32, soilMoisture: 71, tilt: 1.9, environment: 'Moderate Rain', battery: 92, status: 'ONLINE', lastUpdate: '09:39 AM' },
  { id: 'sen7', villageId: 'v7', node: 'UK-007', rainfall: 57, soilMoisture: 88, tilt: 4.1, environment: 'Heavy Rain', battery: 83, status: 'ONLINE', lastUpdate: '09:42 AM' },
  { id: 'sen8', villageId: 'v8', node: 'UK-008', rainfall: 49, soilMoisture: 84, tilt: 3.5, environment: 'Heavy Rain', battery: 81, status: 'ONLINE', lastUpdate: '09:40 AM' },
  { id: 'sen9', villageId: 'v9', node: 'UK-009', rainfall: 37, soilMoisture: 75, tilt: 2.2, environment: 'Rain', battery: 90, status: 'ONLINE', lastUpdate: '09:39 AM' },
  { id: 'sen10', villageId: 'v10', node: 'UK-010', rainfall: 44, soilMoisture: 79, tilt: 2.9, environment: 'Heavy Rain', battery: 87, status: 'OFFLINE', lastUpdate: '09:38 AM' }
];

const mockAlerts: Alert[] = [
  { id: 'ALT-001', villageId: 'v2', hazard: 'FLASH FLOOD', severity: 'CRITICAL', status: 'ACTIVE', timestamp: '09:32 AM', reason: 'Heavy rainfall and increasing soil saturation are creating rapidly increasing flash-flood risk.', action: 'Prepare immediate evacuation of vulnerable locations and maintain clear emergency access routes.' },
  { id: 'ALT-002', villageId: 'v1', hazard: 'COMBINED', severity: 'CRITICAL', status: 'ACTIVE', timestamp: '09:35 AM', reason: 'Heavy rainfall, saturated ground, steep terrain and vulnerable drainage conditions are increasing combined hazard risk.', action: 'Prepare emergency response and evacuation procedures for vulnerable locations.' },
  { id: 'ALT-003', villageId: 'v7', hazard: 'LANDSLIDE', severity: 'CRITICAL', status: 'ACTIVE', timestamp: '09:37 AM', reason: 'Heavy rainfall combined with saturated ground and steep terrain is increasing slope-instability risk.', action: 'Keep people away from unstable slopes and monitor vulnerable roads.' },
  { id: 'ALT-004', villageId: 'v3', hazard: 'COMBINED', severity: 'WARNING', status: 'ACTIVE', timestamp: '09:20 AM', reason: 'Rainfall accumulation and increasing soil moisture are elevating both slope and runoff-related risks.', action: 'Prepare emergency response.' },
  { id: 'ALT-005', villageId: 'v5', hazard: 'FLASH FLOOD', severity: 'WARNING', status: 'ACTIVE', timestamp: '09:15 AM', reason: 'Heavy rainfall detected.', action: 'Monitor low-lying areas.' },
  { id: 'ALT-006', villageId: 'v9', hazard: 'LANDSLIDE', severity: 'WATCH', status: 'ACTIVE', timestamp: '08:58 AM', reason: 'Minor soil saturation observed.', action: 'Continue monitoring.' }
];

const mockFieldReports: FieldReport[] = [
  {
    id: 'FR-001', villageId: 'v1', reporter: 'Ground Observer', time: '09:35 AM', hazard: 'Landslide', 
    eventStatus: 'Event Confirmed', reviewStatus: 'Reviewed',
    eventDetails: 'Ground observation indicates heavy rainfall with localized slope instability and debris movement near the affected area.',
    currentObservations: ['Heavy rainfall observed', 'Saturated ground conditions', 'Localized debris movement', 'Slope instability observed', 'Road access requires monitoring'],
    gps: '30.6340° N, 78.9950° E', observerNotes: 'Debris blocking minor paths. Main route vulnerable.',
    relatedAlertId: 'ALT-002', relatedPredictionId: 'P-001',
    reviewNotes: 'Ground observation is consistent with the reported landslide risk conditions.'
  },
  {
    id: 'FR-002', villageId: 'v2', reporter: 'Ground Observer', time: '09:38 AM', hazard: 'Flash Flood', 
    eventStatus: 'Event Confirmed', reviewStatus: 'Reviewed',
    eventDetails: 'River water level rising rapidly. Fast-flowing debris observed in the channel.',
    currentObservations: ['Heavy rainfall observed', 'River level rapidly increasing', 'Fast debris flow', 'Erosion at river banks'],
    gps: '30.6800° N, 79.0300° E', observerNotes: 'Evacuation of lower Rambara needs immediate execution.',
    relatedAlertId: 'ALT-001', relatedPredictionId: 'P-002',
    reviewNotes: 'Flash flood confirmed. Critical response required.'
  },
  {
    id: 'FR-003', villageId: 'v7', reporter: 'Ground Observer', time: '09:40 AM', hazard: 'Landslide', 
    eventStatus: 'Partial Impact', reviewStatus: 'Pending',
    eventDetails: 'Minor rockfall observed near the highway. No major road blockage yet.',
    currentObservations: ['Moderate rainfall', 'Minor rockfall', 'Slopes highly saturated'],
    gps: '30.4850° N, 79.6200° E', observerNotes: 'NHPC camp area is currently safe but highway access is risky.',
    relatedAlertId: 'ALT-003', relatedPredictionId: 'P-003',
    reviewNotes: 'Awaiting further verification on road status.'
  },
  {
    id: 'FR-004', villageId: 'v3', reporter: 'Ground Observer', time: '09:25 AM', hazard: 'Flood', 
    eventStatus: 'Event Confirmed', reviewStatus: 'Reviewed',
    eventDetails: 'Water logging in low lying areas of Kalimath. Bridge approach roads submerged.',
    currentObservations: ['Heavy rainfall', 'Bridge approaches submerged', 'Local water logging'],
    gps: '30.5750° N, 79.0520° E', observerNotes: 'Bridge structural integrity needs checking after water recedes.',
    relatedAlertId: 'ALT-004', relatedPredictionId: 'P-004',
    reviewNotes: 'Verified submerged approach roads. Evacuation prepared.'
  },
  {
    id: 'FR-005', villageId: 'v5', reporter: 'Ground Observer', time: '09:20 AM', hazard: 'Flood', 
    eventStatus: 'Pending Review', reviewStatus: 'Pending',
    eventDetails: 'River gauge showing warning levels. No overflow yet but expected soon.',
    currentObservations: ['Continuous rain', 'River at warning mark'],
    gps: '30.4320° N, 79.0200° E', observerNotes: 'Monitoring embankment near the Inter College.',
    relatedAlertId: 'ALT-005', relatedPredictionId: 'P-005',
    reviewNotes: 'Awaiting verification.'
  },
  {
    id: 'FR-006', villageId: 'v8', reporter: 'Ground Observer', time: '09:18 AM', hazard: 'Landslide', 
    eventStatus: 'Event Confirmed', reviewStatus: 'Reviewed',
    eventDetails: 'Significant landslide blocking the main village road. Power lines affected.',
    currentObservations: ['Heavy rainfall', 'Road blocked by debris', 'Power lines damaged'],
    gps: '30.5100° N, 79.7300° E', observerNotes: 'Village is isolated. Needs heavy machinery for clearance.',
    relatedPredictionId: 'P-006',
    reviewNotes: 'Confirmed. Immediate road clearance and relief required.'
  }
];

const mockPredictions: Prediction[] = [
  { id: 'P-001', villageId: 'v1', predictedHazard: 'Landslide', risk: 'Critical', fieldObservation: 'Landslide Confirmed', result: 'CONFIRMED', predictionTime: '01:15 AM', fieldConfirmationTime: '09:35 AM' },
  { id: 'P-002', villageId: 'v2', predictedHazard: 'Flash Flood', risk: 'Critical', fieldObservation: 'Flood Confirmed', result: 'CONFIRMED', predictionTime: '02:00 AM', fieldConfirmationTime: '09:38 AM' },
  { id: 'P-003', villageId: 'v7', predictedHazard: 'Combined', risk: 'Critical', fieldObservation: 'Partial Impact', result: 'PARTIAL', predictionTime: '11:30 PM (prev day)', fieldConfirmationTime: '09:40 AM' },
  { id: 'P-004', villageId: 'v3', predictedHazard: 'Flash Flood', risk: 'High', fieldObservation: 'Flood Confirmed', result: 'CONFIRMED', predictionTime: '03:45 AM', fieldConfirmationTime: '09:25 AM' },
  { id: 'P-005', villageId: 'v5', predictedHazard: 'Flash Flood', risk: 'High', fieldObservation: 'No Significant Impact', result: 'FALSE ALARM', predictionTime: '05:15 AM', fieldConfirmationTime: '09:20 AM' },
  { id: 'P-006', villageId: 'v8', predictedHazard: 'Landslide', risk: 'Critical', fieldObservation: 'Landslide Confirmed', result: 'CONFIRMED', predictionTime: '04:00 AM', fieldConfirmationTime: '09:18 AM' }
];


const mockHistoryEvents: HistoryEvent[] = [
  { id: 'EVT-001', villageId: 'v1', hazard: 'Landslide', risk: 'Critical', time: '09:35 AM', outcome: 'Confirmed' },
  { id: 'EVT-002', villageId: 'v2', hazard: 'Flash Flood', risk: 'Critical', time: '09:38 AM', outcome: 'Confirmed' },
  { id: 'EVT-003', villageId: 'v7', hazard: 'Landslide', risk: 'Critical', time: '09:40 AM', outcome: 'Partial Impact' },
  { id: 'EVT-004', villageId: 'v3', hazard: 'Flood', risk: 'High', time: '09:25 AM', outcome: 'Confirmed' },
  { id: 'EVT-005', villageId: 'v5', hazard: 'Flash Flood', risk: 'High', time: '09:20 AM', outcome: 'False Alarm' },
  { id: 'EVT-006', villageId: 'v8', hazard: 'Landslide', risk: 'Critical', time: '09:18 AM', outcome: 'Confirmed' }
];

export const useStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  villages: mockVillages,
  alerts: mockAlerts,
  sensors: mockSensors,
  fieldReports: mockFieldReports,
  predictions: mockPredictions,
  historyEvents: mockHistoryEvents,
  selectedVillageId: null,
  setSelectedVillageId: (id) => set({ selectedVillageId: id }),
  selectedCommunityVillageId: 'v1',
  setSelectedCommunityVillageId: (id) => set({ selectedCommunityVillageId: id }),
  
  fetchDashboardData: async () => {
    try {
      const res = await fetch("http://localhost:8000/api/dashboard/admin");
      if (res.ok) {
        const data = await res.json();
        // Since Supabase returns arrays, update state. If empty/error, fallback to mock.
        if (data.villages && data.villages.length > 0) set({ villages: data.villages });
        if (data.alerts && data.alerts.length > 0) set({ alerts: data.alerts });
        if (data.sensors && data.sensors.length > 0) set({ sensors: data.sensors });
      }
    } catch (e) {
      console.error("Failed to fetch dashboard data, using local mock data.");
    }
  },

  updateFieldReportStatus: async (id, status) => {
    // Optimistic UI update
    set((state) => ({
      fieldReports: state.fieldReports.map(r => r.id === id ? { ...r, eventStatus: status, reviewStatus: 'Reviewed', reviewNotes: 'Admin/Authority reviewed and updated status.' } : r)
    }));
    try {
      await fetch(`http://localhost:8000/api/field-reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error(e);
    }
  },

  updateAlertStatus: async (id, status) => {
    set((state) => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status } : a)
    }));
    
    let action = "";
    if (status === "ACKNOWLEDGED") action = "acknowledge";
    if (status === "ESCALATED") action = "escalate";
    
    if (action) {
      try {
        await fetch(`http://localhost:8000/api/alerts/${id}/${action}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        console.error(e);
      }
    }
  },

  updateVillageResponseStatus: (id, status) => set((state) => ({
    villages: state.villages.map(v => v.id === id ? { ...v, responseStatus: status } : v)
  })),
  addHistoryEvent: (event) => set((state) => ({
    historyEvents: [event, ...state.historyEvents]
  }))
}));

