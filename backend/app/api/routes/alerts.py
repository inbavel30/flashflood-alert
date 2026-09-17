from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.db.supabase import get_supabase
from app.schemas import Alert, AlertStatusUpdate

router = APIRouter()

@router.get("/", response_model=List[Alert])
def get_alerts():
    supabase = get_supabase()
    response = supabase.table("alerts").select("*").execute()
    return response.data

@router.patch("/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: str):
    supabase = get_supabase()
    response = supabase.table("alerts").update({"status": "ACKNOWLEDGED"}).eq("id", alert_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"success": True, "alert": response.data[0]}

@router.patch("/{alert_id}/escalate")
def escalate_alert(alert_id: str):
    supabase = get_supabase()
    response = supabase.table("alerts").update({"status": "ESCALATED"}).eq("id", alert_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"success": True, "alert": response.data[0]}
