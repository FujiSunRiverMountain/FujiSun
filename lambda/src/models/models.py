from pydantic import BaseModel, Field

class PersonalInfo(BaseModel):
  user_id: str
  information: str