import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import xgboost as xgb
import pickle
import os

def train():
    data_path = '../data/training_with_gis.csv'
    if not os.path.exists(data_path):
        data_path = 'ml/data/training_with_gis.csv'
        
    print("Loading dataset...")
    df = pd.read_csv(data_path)
    
    # Selected features based on actual columns
    features = [
        'rainfall', 'soil_moisture', 'slope', 'elevation', 
        'flow_accumulation', 'ground_tilt', 'forecast_rainfall', 
        'historical_flood_risk', 'historical_landslide_risk'
    ]
    
    # For predicting combined risk, we can use a binary label 
    # where 1 indicates either flood or landslide
    df['risk_event'] = ((df['flood_event'] == 1) | (df['landslide_event'] == 1)).astype(int)
    
    X = df[features]
    y = df['risk_event']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training XGBoost Model (Predicting Risk)...")
    xgb_model = xgb.XGBClassifier(eval_metric='logloss', random_state=42)
    xgb_model.fit(X_train, y_train)
    
    xgb_preds = xgb_model.predict(X_test)
    print("\n--- XGBoost Performance ---")
    print("Accuracy:", accuracy_score(y_test, xgb_preds))
    print(classification_report(y_test, xgb_preds))
    
    print("Training Random Forest Model (Validating/Comparing)...")
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    
    rf_preds = rf_model.predict(X_test)
    print("\n--- Random Forest Validation ---")
    print("Accuracy:", accuracy_score(y_test, rf_preds))
    print(classification_report(y_test, rf_preds))
    
    # Save the new XGBoost model as the primary model
    model_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
    os.makedirs(model_dir, exist_ok=True)
    with open(os.path.join(model_dir, 'xgboost_risk_model.pkl'), 'wb') as f:
        pickle.dump(xgb_model, f)
        
    print("Models successfully evaluated. XGBoost model saved to ml/models/xgboost_risk_model.pkl")

if __name__ == '__main__':
    train()
