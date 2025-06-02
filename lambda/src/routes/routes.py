from fastapi import APIRouter, Header
from jose import jwt
from database.repository import create_and_update_information, get_information
from models.models import PersonalInfo

router = APIRouter()

@router.post("/personal_info")
def post_personal_info(information: PersonalInfo, token: str = Header(default='')):
  payload = jwt.get_unverified_claims(token)
  user_id = payload["sub"]
  return create_and_update_information(information.dict(), user_id)

@router.get("/personal_info")
def get_personal_info(token: str = Header(default='')):
  payload = jwt.get_unverified_claims(token)
  user_id = payload["sub"]
  return get_information(user_id)