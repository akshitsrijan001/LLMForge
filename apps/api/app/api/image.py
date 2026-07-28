from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import traceback

from app.services.comfy_service import generate_image

router = APIRouter()


class ImageRequest(BaseModel):
    prompt: str
    style: str = "realistic"


@router.post("/generate-image")
def generate_image_endpoint(request: ImageRequest):
    try:
        image = generate_image(request.prompt)

        return {
            "success": True,
            "type": "image",
            "status": "completed",
            "prompt": request.prompt,
            "image": image,
        }

    except Exception as e:
        print("\n" + "=" * 60)
        print("IMAGE GENERATION ERROR")
        traceback.print_exc()
        print("=" * 60 + "\n")

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )