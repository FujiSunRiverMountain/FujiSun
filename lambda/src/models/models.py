from pydantic import BaseModel

class PersonalInfo(BaseModel):
  information: str


class PresentationScene(BaseModel):
  file_name: str
  information: str


class DownloadStorageId(BaseModel):
  storage_id: str