import pickle
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / 'models' / 'xgboost_risk_model.pkl'

def predict_risk(features_dict):
    '''
    Predicts the risk (0 or 1) based on sensor/GIS data.
    features_dict should contain:
    - rainfall
    - soil_moisture
    - slope
    - elevation
    - flow_accumulation
    - ground_tilt
    - forecast_rainfall
    - historical_flood_risk
    - historical_landslide_risk
    '''
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
        
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
        
    # Convert to DataFrame in the expected feature order
    feature_cols = [
        'rainfall', 'soil_moisture', 'slope', 'elevation', 
        'flow_accumulation', 'ground_tilt', 'forecast_rainfall', 
        'historical_flood_risk', 'historical_landslide_risk'
    ]
    
    df = pd.DataFrame([features_dict])[feature_cols]
    prediction = model.predict(df)[0]
    
    # Optional: Probability
    probability = model.predict_proba(df)[0][1]
    
    return {
        "risk_detected": bool(prediction),
        "confidence": float(probability)
    }

if __name__ == '__main__':
    # Test example
    sample = {
        'rainfall': 5.36,
        'soil_moisture': 72.7,
        'slope': 30.3,
        'elevation': 1719.0,
        'flow_accumulation': 18.1,
        'ground_tilt': -0.02,
        'forecast_rainfall': 9.06,
        'historical_flood_risk': 0.11,
        'historical_landslide_risk': 0.89
    }
    result = predict_risk(sample)
    print("Prediction Result:", result)
