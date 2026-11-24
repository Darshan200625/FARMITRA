import os
import json
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2

# ==============================
# FarmMitra Plant Disease Model
# ==============================

# Dataset location
DATASET_DIR = os.path.join(os.path.dirname(__file__), "dataset")

# Model output folder
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
os.makedirs(MODEL_DIR, exist_ok=True)

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 5
SEED = 123


print("====================================")
print("      FARMMITRA AI TRAINING")
print("====================================")
print("Dataset:", DATASET_DIR)

# ==============================
# Load training dataset
# ==============================

train_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="training",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

# ==============================
# Load validation dataset
# ==============================

val_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

# ==============================
# Get class names
# ==============================

class_names = train_ds.class_names

print("\nNumber of disease classes:", len(class_names))

print("\nClasses:")
for i, name in enumerate(class_names):
    print(i, "->", name)

# Save class names
class_file = os.path.join(MODEL_DIR, "class_names.json")

with open(class_file, "w") as f:
    json.dump(class_names, f, indent=4)

print("\nClass names saved to:", class_file)

# ==============================
# Improve performance
# ==============================

AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

# ==============================
# Data augmentation
# ==============================

data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])

# ==============================
# MobileNetV2 base model
# ==============================

base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze base model initially
base_model.trainable = False

# ==============================
# Build FarmMitra model
# ==============================

inputs = layers.Input(shape=(224, 224, 3))

x = data_augmentation(inputs)

x = tf.keras.applications.mobilenet_v2.preprocess_input(x)

x = base_model(x, training=False)

x = layers.GlobalAveragePooling2D()(x)

x = layers.Dropout(0.3)(x)

outputs = layers.Dense(
    len(class_names),
    activation="softmax"
)(x)

model = models.Model(inputs, outputs)

# ==============================
# Compile
# ==============================

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# ==============================
# Train
# ==============================

print("\n====================================")
print("Starting FarmMitra training...")
print("====================================\n")

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# ==============================
# Save model
# ==============================

model_path = os.path.join(
    MODEL_DIR,
    "farmmitra_plant_disease_model.keras"
)

model.save(model_path)

print("\n====================================")
print(" FARM MITRA MODEL TRAINING COMPLETE ")
print("====================================")

print("Model saved at:")
print(model_path)

print("Classes:", len(class_names))