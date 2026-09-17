const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

// Update Prediction interface
code = code.replace(
  "result: 'CONFIRMED' | 'PARTIAL' | 'FALSE ALARM' | 'PENDING';",
  "result: 'CONFIRMED' | 'PARTIAL' | 'FALSE ALARM' | 'PENDING';\n  predictionTime: string;\n  fieldConfirmationTime: string;"
);

// Update mockPredictions
const newMockPredictions = `const mockPredictions: Prediction[] = [
  { id: 'P-001', villageId: 'v1', predictedHazard: 'Landslide', risk: 'Critical', fieldObservation: 'Landslide Confirmed', result: 'CONFIRMED', predictionTime: '01:15 AM', fieldConfirmationTime: '09:35 AM' },
  { id: 'P-002', villageId: 'v2', predictedHazard: 'Flash Flood', risk: 'Critical', fieldObservation: 'Flood Confirmed', result: 'CONFIRMED', predictionTime: '02:00 AM', fieldConfirmationTime: '09:38 AM' },
  { id: 'P-003', villageId: 'v7', predictedHazard: 'Combined', risk: 'Critical', fieldObservation: 'Partial Impact', result: 'PARTIAL', predictionTime: '11:30 PM (prev day)', fieldConfirmationTime: '09:40 AM' },
  { id: 'P-004', villageId: 'v3', predictedHazard: 'Flash Flood', risk: 'High', fieldObservation: 'Flood Confirmed', result: 'CONFIRMED', predictionTime: '03:45 AM', fieldConfirmationTime: '09:25 AM' },
  { id: 'P-005', villageId: 'v5', predictedHazard: 'Flash Flood', risk: 'High', fieldObservation: 'No Significant Impact', result: 'FALSE ALARM', predictionTime: '05:15 AM', fieldConfirmationTime: '09:20 AM' },
  { id: 'P-006', villageId: 'v8', predictedHazard: 'Landslide', risk: 'Critical', fieldObservation: 'Landslide Confirmed', result: 'CONFIRMED', predictionTime: '04:00 AM', fieldConfirmationTime: '09:18 AM' }
];`;

code = code.replace(/const mockPredictions: Prediction\[\] = \[.*?\];/s, newMockPredictions);

fs.writeFileSync(file, code);
console.log("Updated Prediction times");
