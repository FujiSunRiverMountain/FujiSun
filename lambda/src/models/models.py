from pydantic import BaseModel

class PersonalInfo(BaseModel):
  information: str

class PresentationScene(BaseModel):
  file_name: str
  information: str
