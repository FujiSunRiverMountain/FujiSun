# from .db import dynamodb
# from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse
# from boto3.dynamodb.conditions import Key

# table = dynamodb.Table("PersonalInfo")

def create_and_update_information(information: dict):
  return JSONResponse(content=information)
  # try:
  #   table.put_item(Item=information)
  #   return information
  
  # except ClientError as e:
  #   return JSONResponse(content=e.response["error"], status_code=500)


def get_information():
  return JSONResponse(content={"information": "ユーザーID"})
  # try:
  #   response = table.get_item(Key=user_id)

  #   return response["Items"]

  # except ClientError as e:
  #   return JSONResponse(content=e.response["error"], status_code=500)
  