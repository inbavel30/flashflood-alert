const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

// 1. Update FieldReport interface
const updatedInterface = `export interface FieldReport {
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
}`;
code = code.replace(/export interface FieldReport \{.*?\}/s, updatedInterface);

// 2. Update mockFieldReports
const mockFieldReportsNew = `const mockFieldReports: FieldReport[] = [
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
];`;
code = code.replace(/const mockFieldReports: FieldReport\[\] = \[.*?\];/s, mockFieldReportsNew);

// 3. Ensure the update method handles reviewNotes if needed.
// Actually, `updateFieldReportStatus` already marks reviewStatus: 'Reviewed'.
// Let's modify it to also update reviewNotes.
code = code.replace(
  /updateFieldReportStatus: \(id, status\) => set\(\(state\) => \(\{\n\s*fieldReports: state\.fieldReports\.map\(r => r\.id === id \? \{ \.\.\.r, eventStatus: status, reviewStatus: 'Reviewed' \} : r\)\n\s*\}\)\),/,
  `updateFieldReportStatus: (id, status) => set((state) => ({
    fieldReports: state.fieldReports.map(r => r.id === id ? { ...r, eventStatus: status, reviewStatus: 'Reviewed', reviewNotes: 'Admin/Authority reviewed and updated status.' } : r)
  })),`
);

fs.writeFileSync(file, code);
console.log("Updated useStore.ts for Field Reports.");
