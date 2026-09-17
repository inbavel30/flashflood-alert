const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace the current mockVillages array with the correct one
const newMockVillages = `const mockVillages: Village[] = [
  {
    id: 'v1', name: 'Gaurikund', district: 'Rudraprayag', lat: 30.634, lng: 78.995,
    flashFloodRisk: 'CRITICAL', landslideRisk: 'CRITICAL', combinedRisk: 'CRITICAL',
    confidence: 89, warningWindow: '35–55 min', population: 2800,
    infrastructure: { roads: 4, bridges: 2, schools: 2, hospitals: 1 },
    responseStatus: 'Action Required',
    shelters: [{ id: 's1', name: 'Gaurikund Temple Complex', capacity: 800, distance: 0.5, lat: 30.635, lng: 78.996 }]
  },
  {
    id: 'v2', name: 'Rambara', district: 'Rudraprayag', lat: 30.680, lng: 79.030,
    flashFloodRisk: 'CRITICAL', landslideRisk: 'HIGH', combinedRisk: 'CRITICAL',
    confidence: 91, warningWindow: '30–50 min', population: 1950,
    infrastructure: { roads: 3, bridges: 2, schools: 1, hospitals: 0 },
    responseStatus: 'Evacuation Prepared',
    shelters: [{ id: 's2', name: 'Rambara GMVN Shelter', capacity: 400, distance: 0.8, lat: 30.681, lng: 79.031 }]
  },
  {
    id: 'v3', name: 'Kalimath', district: 'Rudraprayag', lat: 30.575, lng: 79.052,
    flashFloodRisk: 'HIGH', landslideRisk: 'HIGH', combinedRisk: 'HIGH',
    confidence: 85, warningWindow: '40–60 min', population: 1750,
    infrastructure: { roads: 3, bridges: 1, schools: 1, hospitals: 1 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's3', name: 'Kalimath Govt School', capacity: 350, distance: 1.2, lat: 30.576, lng: 79.053 }]
  },
  {
    id: 'v4', name: 'Semi', district: 'Rudraprayag', lat: 30.550, lng: 79.060,
    flashFloodRisk: 'MODERATE', landslideRisk: 'HIGH', combinedRisk: 'HIGH',
    confidence: 82, warningWindow: '45–65 min', population: 1420,
    infrastructure: { roads: 2, bridges: 1, schools: 1, hospitals: 0 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's4', name: 'Semi Community Hall', capacity: 250, distance: 1.0, lat: 30.551, lng: 79.061 }]
  },
  {
    id: 'v5', name: 'Chandrapuri', district: 'Rudraprayag', lat: 30.432, lng: 79.020,
    flashFloodRisk: 'HIGH', landslideRisk: 'MODERATE', combinedRisk: 'HIGH',
    confidence: 87, warningWindow: '45–65 min', population: 2100,
    infrastructure: { roads: 3, bridges: 1, schools: 2, hospitals: 1 },
    responseStatus: 'Action Required',
    shelters: [{ id: 's5', name: 'Chandrapuri Inter College', capacity: 600, distance: 1.5, lat: 30.433, lng: 79.021 }]
  },
  {
    id: 'v6', name: 'Agastmuni', district: 'Rudraprayag', lat: 30.380, lng: 79.015,
    flashFloodRisk: 'MODERATE', landslideRisk: 'MODERATE', combinedRisk: 'MODERATE',
    confidence: 78, warningWindow: '50–70 min', population: 2400,
    infrastructure: { roads: 2, bridges: 1, schools: 2, hospitals: 1 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's6', name: 'Agastmuni Sports Complex', capacity: 1000, distance: 2.0, lat: 30.381, lng: 79.016 }]
  },
  {
    id: 'v7', name: 'Tapovan', district: 'Chamoli', lat: 30.485, lng: 79.620,
    flashFloodRisk: 'CRITICAL', landslideRisk: 'CRITICAL', combinedRisk: 'CRITICAL',
    confidence: 93, warningWindow: '30–50 min', population: 2300,
    infrastructure: { roads: 4, bridges: 2, schools: 1, hospitals: 1 },
    responseStatus: 'Action Required',
    shelters: [{ id: 's7', name: 'Tapovan NHPC Camp', capacity: 1200, distance: 0.7, lat: 30.486, lng: 79.621 }]
  },
  {
    id: 'v8', name: 'Lata', district: 'Chamoli', lat: 30.510, lng: 79.730,
    flashFloodRisk: 'MODERATE', landslideRisk: 'CRITICAL', combinedRisk: 'CRITICAL',
    confidence: 90, warningWindow: '35–55 min', population: 1300,
    infrastructure: { roads: 2, bridges: 1, schools: 1, hospitals: 0 },
    responseStatus: 'Evacuation Prepared',
    shelters: [{ id: 's8', name: 'Lata Village Panchayat', capacity: 300, distance: 0.5, lat: 30.511, lng: 79.731 }]
  },
  {
    id: 'v9', name: 'Pipalkoti', district: 'Chamoli', lat: 30.435, lng: 79.420,
    flashFloodRisk: 'MODERATE', landslideRisk: 'HIGH', combinedRisk: 'HIGH',
    confidence: 84, warningWindow: '45–65 min', population: 1500,
    infrastructure: { roads: 2, bridges: 1, schools: 1, hospitals: 1 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's9', name: 'Pipalkoti Relief Center', capacity: 500, distance: 1.1, lat: 30.436, lng: 79.421 }]
  },
  {
    id: 'v10', name: 'Nautha', district: 'Chamoli', lat: 30.290, lng: 79.350,
    flashFloodRisk: 'LOW', landslideRisk: 'MODERATE', combinedRisk: 'MODERATE',
    confidence: 75, warningWindow: '50–70 min', population: 930,
    infrastructure: { roads: 1, bridges: 0, schools: 1, hospitals: 0 },
    responseStatus: 'Monitoring',
    shelters: [{ id: 's10', name: 'Nautha Primary School', capacity: 200, distance: 0.8, lat: 30.291, lng: 79.351 }]
  }
];`;

code = code.replace(/const mockVillages: Village\[\] = \[.*?\];/s, newMockVillages);

fs.writeFileSync(file, code);
console.log("Fixed mockVillages");
