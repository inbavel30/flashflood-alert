-- Supabase Schema for FlashFlood Alert AI

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    role TEXT CHECK (role IN ('ADMIN', 'AUTHORITY', 'COMMUNITY')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations (Villages)
CREATE TABLE IF NOT EXISTS locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    lat NUMERIC NOT NULL,
    lng NUMERIC NOT NULL,
    flash_flood_risk TEXT CHECK (flash_flood_risk IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    landslide_risk TEXT CHECK (landslide_risk IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    combined_risk TEXT CHECK (combined_risk IN ('LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    confidence NUMERIC,
    warning_window TEXT,
    population INTEGER,
    roads INTEGER,
    bridges INTEGER,
    schools INTEGER,
    hospitals INTEGER,
    response_status TEXT CHECK (response_status IN ('Monitoring', 'Action Required', 'Evacuation Prepared', 'Evacuation Active', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shelters
CREATE TABLE IF NOT EXISTS shelters (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    distance NUMERIC NOT NULL,
    lat NUMERIC NOT NULL,
    lng NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts
CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
    hazard TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('WATCH', 'WARNING', 'CRITICAL')),
    status TEXT CHECK (status IN ('ACTIVE', 'RESOLVED', 'ACKNOWLEDGED', 'ESCALATED')),
    timestamp TEXT NOT NULL,
    reason TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sensors
CREATE TABLE IF NOT EXISTS sensors (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
    node TEXT NOT NULL,
    rainfall NUMERIC,
    soil_moisture NUMERIC,
    tilt NUMERIC,
    environment TEXT,
    battery NUMERIC,
    status TEXT CHECK (status IN ('ONLINE', 'OFFLINE')),
    last_update TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Field Reports
CREATE TABLE IF NOT EXISTS field_reports (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
    reporter TEXT NOT NULL,
    time TEXT NOT NULL,
    hazard TEXT NOT NULL,
    event_status TEXT CHECK (event_status IN ('Pending Review', 'Event Confirmed', 'Partial Impact', 'False Alarm')),
    review_status TEXT CHECK (review_status IN ('Pending', 'Reviewed')),
    event_details TEXT,
    current_observations JSONB,
    photo_url TEXT,
    gps TEXT,
    observer_notes TEXT,
    related_alert_id TEXT REFERENCES alerts(id) ON DELETE SET NULL,
    related_prediction_id TEXT,
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Predictions
CREATE TABLE IF NOT EXISTS predictions (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
    predicted_hazard TEXT,
    risk TEXT CHECK (risk IN ('Critical', 'High', 'Moderate', 'Low')),
    field_observation TEXT,
    result TEXT CHECK (result IN ('CONFIRMED', 'PARTIAL', 'FALSE ALARM', 'PENDING')),
    prediction_time TEXT,
    field_confirmation_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- History Events
CREATE TABLE IF NOT EXISTS history_events (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
    hazard TEXT NOT NULL,
    risk TEXT NOT NULL,
    time TEXT NOT NULL,
    outcome TEXT NOT NULL,
    action TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    previous_status TEXT,
    new_status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
