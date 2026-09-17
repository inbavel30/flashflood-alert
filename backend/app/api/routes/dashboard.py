from fastapi import APIRouter
from app.db.supabase import get_supabase

router = APIRouter()

@router.get("/admin")
def get_admin_dashboard():
    supabase = get_supabase()
    alerts = supabase.table("alerts").select("*").execute()
    villages = supabase.table("locations").select("*").execute()
    sensors = supabase.table("sensors").select("*").execute()
    return {
        "alerts": alerts.data,
        "villages": villages.data,
        "sensors": sensors.data
    }
