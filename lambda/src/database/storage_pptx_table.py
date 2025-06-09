from .db import dynamodb
from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse

table = dynamodb.Table("storagePPTX")

def create_pptx_data(storage_id: str, user_id: str, file_name: str):
  try:
    response = table.update_item(
      Key={
        "storageId": storage_id,
        "userId": user_id
      },
      UpdateExpression="SET fileName = :fileName",
      ExpressionAttributeValues={
        ":fileName": file_name
      },
      ReturnValues="UPDATED_NEW"
    )
  
  except ClientError as e:
    return JSONResponse(
        content={"error": str(e), "details": e.response.get("Error", {})},
        status_code=500
      )
  