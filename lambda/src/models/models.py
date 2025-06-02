from pydantic import BaseModel, Field

class PersonalInfo(BaseModel):
  information: str