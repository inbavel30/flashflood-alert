from pydantic import BaseModel
from typing import List, Optional

class Village(BaseModel):
    id: str
    name: str
    district: str
    lat: float
    lng: float
    flashFloodRisk: str
    landslideRisk: str
    combinedRisk: str
    confidence: float
    warningWindow: str
    population: int
    # omitted nested infra for brevity in generic schema

class Alert(BaseModel):
    id: str
    villageId: str
    hazard: str
    severity: str
    status: str
    timestamp: str
    reason: str
    action: str

class AlertStatusUpdate(BaseModel):
    status: str
