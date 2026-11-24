import pandas as pd
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# ==========================================
# Paths
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "Crop_recommendation.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "model"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "crop_recommendation_model.pkl"
)


# ==========================================
# Create model folder
# ==========================================

os.makedirs(MODEL_DIR, exist_ok=True)


# ==========================================
# Load dataset
# ==========================================

print("Loading crop dataset...")

df = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")
print("Rows:", len(df))
print("Columns:", df.columns.tolist())


# ==========================================
# Features and target
# ==========================================

X = df[
    [
        "N",
        "P",
        "K",
        "temperature",
        "humidity",
        "ph",
        "rainfall"
    ]
]

y = df["label"]


# ==========================================
# Split dataset
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))


# ==========================================
# Create AI model
# ==========================================

print("\nTraining Crop Recommendation AI...")

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)


# ==========================================
# Test model
# ==========================================

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)


print("\n====================================")
print("Crop Recommendation AI")
print("====================================")
print("Accuracy:", round(accuracy * 100, 2), "%")
print("====================================")


# ==========================================
# Save model
# ==========================================

joblib.dump(
    model,
    MODEL_PATH
)

print("\nModel saved successfully!")
print("Location:", MODEL_PATH)