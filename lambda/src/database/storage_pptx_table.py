from .db import dynamodb
from botocore.exceptions import ClientError
from fastapi.responses import JSONResponse
from boto3.dynamodb.conditions import Key

table = dynamodb.Table("storagePPTX")

def create_pptx_data(storage_id: str, user_id: str, file_name: str):
  try:
    table.update_item(
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


def get_pptx(user_id: str):
  try:
    response = table.query(
      IndexName='userId-storageId-index',
      KeyConditionExpression=Key('userId').eq(user_id),
      ProjectionExpression='storageId, fileName'
    )

    results = []
    for item in response.get("Items", []):
      results.append({"storage_id": item["storageId"], "file_name": item["fileName"]})

    return results
  
  except ClientError as e:
    return JSONResponse(
        content={"error": str(e), "details": e.response.get("Error", {})},
        status_code=500
      )
  
