import uuid
from io import BytesIO
from models.models import PresentationScene
from app.gemini import generate_pptx_code
from app.s3 import upload_pptx_to_s3
from database.storage_pptx_table import create_pptx_data

def generate_slide(presentation_scene: PresentationScene, user_id: str):
  gemini_response = generate_pptx_code(presentation_scene, user_id)

  namespace = {"BytesIO": BytesIO}
  exec(gemini_response, namespace)

  ppt_data = namespace["response"].getvalue()

  storage_id = str(uuid.uuid4())
  file_name = f"{presentation_scene.file_name}.pptx"
  upload_pptx_to_s3(
    ppt_data,
    bucket_name="download-slide",
    object_key=f"{storage_id}/{file_name}"
  )

  create_pptx_data(storage_id, user_id, file_name)