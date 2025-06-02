from fastapi import APIRouter
from database.repository import create_and_update_information, get_information
from models.models import PersonalInfo

router = APIRouter()

@router.post("/personal_info")
def post_personal_info(information: PersonalInfo):
  return create_and_update_information(information.dict())

@router.get("/personal_info")
def get_personal_info():
  return get_information('test123')