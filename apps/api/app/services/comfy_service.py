import json
import time
import uuid
from pathlib import Path

import requests

COMFY_URL = "http://127.0.0.1:8188"

WORKFLOW_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "workflows"
    / "text_to_image.json"
)


def generate_image(prompt: str):
    print("=" * 60)
    print("🎨 generate_image() called")
    print("Prompt:", prompt)

    # --------------------------------------------------
    # Check ComfyUI
    # --------------------------------------------------
    try:
        print("Checking ComfyUI...")
        requests.get(f"{COMFY_URL}/system_stats", timeout=10).raise_for_status()
        print("✅ ComfyUI reachable.")
    except Exception as e:
        raise Exception(f"Cannot connect to ComfyUI: {e}")

    # --------------------------------------------------
    # Load workflow
    # --------------------------------------------------
    with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
        workflow = json.load(f)

    # Replace prompt
    workflow["3"]["inputs"]["text"] = prompt

    client_id = str(uuid.uuid4())

    # --------------------------------------------------
    # Submit prompt
    # --------------------------------------------------
    response = requests.post(
        f"{COMFY_URL}/prompt",
        json={
            "prompt": workflow,
            "client_id": client_id,
        },
        timeout=30,
    )

    print("POST /prompt status:", response.status_code)
    print("POST /prompt body:", response.text)

    response.raise_for_status()

    prompt_id = response.json()["prompt_id"]

    print("✅ Prompt submitted")
    print("Prompt ID:", prompt_id)

    # --------------------------------------------------
    # Wait for completion
    # --------------------------------------------------
    print("⏳ Waiting for image generation...")

    history = {}

    for i in range(900):

        try:
            history = requests.get(
                f"{COMFY_URL}/history/{prompt_id}",
                timeout=10,
            ).json()

        except Exception as e:
            print("History request failed:", e)
            time.sleep(1)
            continue

        if prompt_id in history:
            print("✅ Generation complete.")
            break

        time.sleep(1)

    else:
        raise Exception("Timed out waiting for ComfyUI.")

    print("=" * 60)
    print("FULL HISTORY")
    print(json.dumps(history, indent=2))
    print("=" * 60)

    if prompt_id not in history:
        raise Exception(f"Prompt {prompt_id} not found in history.")

    outputs = history[prompt_id].get("outputs", {})

    print("OUTPUT NODES:")
    print(outputs.keys())

    for node in outputs.values():
        if "images" in node:
            image = node["images"][0]

            print("✅ Image found:", image)

            return {
                "filename": image["filename"],
                "subfolder": image["subfolder"],
                "type": image["type"],
            }

    raise Exception("No generated image found.")