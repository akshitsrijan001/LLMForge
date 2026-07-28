from __future__ import annotations

from .base import Tool
from app.services.comfy_service import generate_image


class ImageGenerationTool(Tool):

    name = "image_generation"

    description = "Generate images using the configured backend."

    def can_handle(self, plan):
        return plan.needs_image_generation

    def execute(
        self,
        prompt: str,
        history=None,
        files=None,
        generation_settings=None,
        backend: str = "comfyui",
    ):

        print("🎨 Image Generation Requested")
        print("Prompt:", prompt)

        image = generate_image(prompt)

        return {
            "type": "image",
            "status": "completed",
            "image": image,
        }