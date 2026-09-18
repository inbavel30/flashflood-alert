🌊 FlashFlood Alert AI: Hyper-Local Flash Flood & Landslide Early Warning System

 **An AI-powered multi-source early warning and disaster-response platform for hilly regions**

---

 🌍 Overview

Flash floods and rainfall-triggered landslides can develop rapidly in hilly regions. Regional warnings may not provide enough information about the specific village, affected area, available shelter, or safer evacuation route.

**FlashFlood Alert AI** combines **weather, rainfall, soil moisture, terrain/GIS, historical data, and IoT sensor observations** to provide hyper-local flash-flood and landslide risk assessment with actionable warnings.

The system focuses on answering:

**WHERE → WHEN → WHY → WHAT TO DO**

---

## 🚀 Key Features

- 🌧️ **Multi-Source Risk Analysis** — Weather, rainfall, soil, terrain, GIS, historical and IoT data.
- 🗺️ **Hyper-Local Risk Mapping** — Village/ward-level hazard visualization.
- 🌊 **Flash Flood Prediction** — AI-based flash-flood risk assessment.
- ⛰️ **Landslide Risk Detection** — Uses rainfall, soil, slope and tilt-related factors.
- 🔄 **Flood–Landslide Cascade Analysis** — Identifies potential debris/channel-blockage effects.
- ⏱️ **Early Warning** — Provides an estimated warning lead-time window.
- 🚨 **Actionable Alerts** — LOW, MODERATE, HIGH and CRITICAL risk levels.
- 🏠 **Shelter Identification** — Shows available nearby shelters.
- 🛣️ **Safer Route Guidance** — Identifies safer and potentially blocked evacuation routes.
- 📡 **IoT Monitoring** — Real-time environmental and sensor observations.
- 📶 **Offline-Resilient Communication** — ESP32 + LoRa + edge/local alert concepts.
- 🔍 **Explainable Risk Factors** — Shows the factors contributing to the assessed risk.
- 🔁 **Continuous Validation** — Prediction → Event → Validation → Improvement.

---

## 🧠 AI / ML

- **XGBoost** — Flash-flood risk prediction
- **Random Forest** — Model validation
- **SHAP** — Explainable risk factors
- **Pandas & NumPy** — Data processing and feature engineering

## 🧠 Risk Inputs

- 🌧️ **Rainfall**
- 💧 **Soil Moisture**
- 🌦️ **Weather**
- 🗺️ **Terrain / DEM**
- ⛰️ **Slope**
- 📐 **Tilt**
- 📚 **Historical Events**
- 📡 **IoT Observations**

---

## 💻 Technology Stack

### Frontend

- **React.js**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

### Backend

- **Python**
- **FastAPI**
- **Supabase**
- **PostgreSQL**

### GIS

- **Interactive Maps**
- **OpenStreetMap**
- **GPS**
- **Terrain / DEM**

### IoT

- **ESP32**
- **LoRa**
- **Rain Sensor**
- **Soil Moisture Sensor**
- **MPU6050**
- **BME280**
- **NEO-6M GPS**
- **ESP32-CAM**

---

## ⚙️ System Workflow

```text
┌─────────────────────────┐
│    Multi-Source Data    │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ IoT + Weather + GIS     │
│       + Terrain         │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│     Data Processing     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│    AI / ML Risk Models  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Flood + Landslide Risk  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   Combined Risk         │
│      Analysis           │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│     Early Warning       │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│     Affected Area       │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Shelter + Safer Route   │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│    Emergency Action     │
└─────────────────────────┘

🗺️ Study Area

The current system focuses on Uttarakhand.

Rudraprayag
Gaurikund
Rambara
Kalimath
Semi
Chandrapuri
Agastmuni
Chamoli
Tapovan
Lata
Pipalkoti
Nautha

🚨 Risk & Response
Risk Level	Response
🟢 LOW	Monitor
🟡 MODERATE	Prepare
🟠 HIGH	Take precautionary action
🔴 CRITICAL	Immediate emergency attention

The platform connects risk assessment with:

Alerts → Affected Areas → Evacuation Guidance → Shelters → Safer Routes

📡 IoT & Offline Warning
Sensors
   ↓
ESP32
   ↓
Edge Processing
   ↓
LoRa
   ↓
Local Warning / Siren

The architecture is designed to support critical warning communication during connectivity failures.

🌱 Impact
Earlier disaster preparedness
Hyper-local village-level risk information
Faster evacuation planning
Protection of vulnerable communities
Protection of roads, bridges, schools and hospitals
Improved flood–landslide awareness
Low-cost and scalable IoT monitoring

🎯 Target Users
Disaster Management Authorities
District / Local Administration
Emergency Response Teams
Infrastructure Teams
Local Bodies
Hilly Communities

