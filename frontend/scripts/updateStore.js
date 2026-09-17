const fs = require('fs');

const file = 'src/store/useStore.ts';
let code = fs.readFileSync(file, 'utf8');

// Add HistoryEvent type
const historyEventInterface = `
export interface HistoryEvent {
  id: string;
  villageId: string;
  hazard: string;
  risk: string;
  time: string;
  outcome: string;
}
`;

code = code.replace("export interface FieldReport", historyEventInterface + "\nexport interface FieldReport");

// Add responseStatus to Village
code = code.replace("shelters: Shelter[];", "shelters: Shelter[];\n  responseStatus: 'Monitoring' | 'Action Required' | 'Evacuation Prepared' | 'Evacuation Active' | 'Resolved';");

// Add historyEvents and updateVillageResponseStatus to AppState
code = code.replace("predictions: Prediction[];", "predictions: Prediction[];\n  historyEvents: HistoryEvent[];");
code = code.replace("updateAlertStatus: (id: string, status: Alert['status']) => void;", "updateAlertStatus: (id: string, status: Alert['status']) => void;\n  updateVillageResponseStatus: (id: string, status: Village['responseStatus']) => void;");

// Update mockVillages with initial responseStatus based on prompt
const vMap = {
  v1: 'Action Required', // Gaurikund
  v2: 'Evacuation Prepared', // Rambara
  v3: 'Monitoring', // Kalimath
  v4: 'Monitoring', // Semi
  v5: 'Action Required', // Chandrapuri
  v6: 'Monitoring', // Agastmuni
  v7: 'Action Required', // Tapovan
  v8: 'Evacuation Prepared', // Lata
  v9: 'Monitoring', // Pipalkoti
  v10: 'Monitoring' // Nautha
};

// Use regex to inject responseStatus into mockVillages
for (const [id, status] of Object.entries(vMap)) {
  const regex = new RegExp(`(id: '${id}'.*?})`, 's');
  code = code.replace(regex, (match) => {
    return match.replace("shelters: [", `responseStatus: '${status}',\n    shelters: [`);
  });
}

// Add mockHistoryEvents
const mockHistoryEvents = `
const mockHistoryEvents: HistoryEvent[] = [
  { id: 'EVT-001', villageId: 'v1', hazard: 'Landslide', risk: 'Critical', time: '09:35 AM', outcome: 'Confirmed' },
  { id: 'EVT-002', villageId: 'v2', hazard: 'Flash Flood', risk: 'Critical', time: '09:38 AM', outcome: 'Confirmed' },
  { id: 'EVT-003', villageId: 'v7', hazard: 'Landslide', risk: 'Critical', time: '09:40 AM', outcome: 'Partial Impact' },
  { id: 'EVT-004', villageId: 'v3', hazard: 'Flood', risk: 'High', time: '09:25 AM', outcome: 'Confirmed' },
  { id: 'EVT-005', villageId: 'v5', hazard: 'Flash Flood', risk: 'High', time: '09:20 AM', outcome: 'False Alarm' },
  { id: 'EVT-006', villageId: 'v8', hazard: 'Landslide', risk: 'Critical', time: '09:18 AM', outcome: 'Confirmed' }
];
`;
code = code.replace("export const useStore", mockHistoryEvents + "\nexport const useStore");

// Update useStore implementation
code = code.replace("predictions: mockPredictions,", "predictions: mockPredictions,\n  historyEvents: mockHistoryEvents,");
code = code.replace("updateAlertStatus: (id, status) => set((state) => ({\n    alerts: state.alerts.map(a => a.id === id ? { ...a, status } : a)\n  }))", "updateAlertStatus: (id, status) => set((state) => ({\n    alerts: state.alerts.map(a => a.id === id ? { ...a, status } : a)\n  })),\n  updateVillageResponseStatus: (id, status) => set((state) => ({\n    villages: state.villages.map(v => v.id === id ? { ...v, responseStatus: status } : v)\n  }))");

fs.writeFileSync(file, code);
console.log("Updated useStore.ts");
