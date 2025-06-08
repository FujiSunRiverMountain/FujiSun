import os
from io import BytesIO
from models.models import PresentationScene
from app.gemini import generate_pptx_code
from app.s3 import upload_pptx_to_s3

def generate_slide(presentation_scene: PresentationScene, user_id: str):
  namespace = {"BytesIO": BytesIO}

  gemini_response = generate_pptx_code(presentation_scene, user_id)
  print(gemini_response)
  exec(gemini_response, namespace)

  ppt_data = namespace["response"].getvalue()

  upload_pptx_to_s3(
    ppt_data,
    bucket_name="download-slide",
    object_key=f"{user_id}/{presentation_scene.file_name}.pptx"
  )

  