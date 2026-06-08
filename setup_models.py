import os
import urllib.request

models_dir = r"d:\Mume\Test\public\models"
os.makedirs(models_dir, exist_ok=True)

files = [
    "tiny_face_detector_model-weights_manifest.json",
    "tiny_face_detector_model-shard1",
    "face_expression_model-weights_manifest.json",
    "face_expression_model-shard1"
]

base_url = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/"

for f in files:
    url = base_url + f
    dest = os.path.join(models_dir, f)
    print(f"Downloading {url} to {dest}...")
    try:
        urllib.request.urlretrieve(url, dest)
        print(f"Successfully downloaded {f}")
    except Exception as e:
        print(f"Error downloading {f}: {e}")

print("Setup models done!")
