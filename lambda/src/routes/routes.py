from fastapi import APIRouter, Header
from database.repository import create_and_update_information, get_information
from app.gemini import generate_with_gemini
from models.models import PersonalInfo, PresentationScenePrompt
import json
import base64

router = APIRouter()

def decode_user_id(token: str):
  parts = token.split(".")
  payload_b64 = parts[1] + "=" * (-len(parts[1]) % 4)
  return json.loads(base64.urlsafe_b64decode(payload_b64))["sub"]

@router.post("/personal_info")
def post_personal_info(information: PersonalInfo, token: str = Header(default='')):
  user_id = decode_user_id(token)
  return create_and_update_information(information.dict(), user_id)

@router.get("/personal_info")
def get_personal_info(token: str = Header(default='')):
  user_id = decode_user_id(token)
  return get_information(user_id)

@router.post("/generate_slide")
def gemini_generate(prompt: PresentationScenePrompt, token: str = Header(default='')):
  user_id = decode_user_id(token)
  return generate_with_gemini(prompt, user_id)