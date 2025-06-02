from .db import dynamodb
from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse
from boto3.dynamodb.conditions import Key

table = dynamodb.Table("personalInfoTest")

def create_and_update_information(personalInfo: dict):
  try:
        response = table.update_item(
            Key={"userId": personalInfo.get("user_id")},
            UpdateExpression="SET information = :info",
            ExpressionAttributeValues={":info": personalInfo.get("information")},
            ReturnValues="UPDATED_NEW"
        )
        return {"information": response["Attributes"]["information"]}
  
  except ClientError as e:
    return JSONResponse(
        content={"error": str(e), "details": e.response.get("Error", {})},
        status_code=500
      )


def get_information(user_id: str):
  try:
    response = table.get_item(Key={"userId": user_id})
    return response["Item"]

  except ClientError as e:
    return JSONResponse(
        content={"error": str(e), "details": e.response.get("Error", {})},
        status_code=500
      )
  