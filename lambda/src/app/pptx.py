import uuid
from io import BytesIO
from models.models import PresentationScene, DownloadStorageId
from app.gemini import generate_pptx_code
from app.s3 import upload_pptx_to_s3, gen_presigned_url
from database.storage_pptx_table import create_pptx_data, get_pptx


def generate_slide(presentation_scene: PresentationScene, user_id: str):
  gemini_response = generate_pptx_code(presentation_scene, user_id)

  namespace = {"BytesIO": BytesIO}
  exec(gemini_response, namespace)

  ppt_data = namespace["response"].getvalue()

  storage_id = str(uuid.uuid4())
  file_name = f"{presentation_scene.file_name}.pptx"
  upload_pptx_to_s3(
    ppt_data,
    object_key=f"{storage_id}/{file_name}"
  )

  create_pptx_data(storage_id, user_id, file_name)


def get_download_pptx_url(download_storage_id: DownloadStorageId, user_id: str):
  pptxs = get_pptx(user_id)
  pptx_file_name = [pptx.get("file_name") for pptx in pptxs if pptx.get("storage_id") == download_storage_id.storage_id][0]
  return gen_presigned_url(f"{download_storage_id.storage_id}/{pptx_file_name}")
