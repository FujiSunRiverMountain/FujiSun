from pydantic import BaseModel

class PersonalInfo(BaseModel):
  information: str

class PresentationScenePrompt(BaseModel):
  prompt: str