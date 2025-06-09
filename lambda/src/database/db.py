import os
from boto3 import resource
from config import is_local

dynamodb = resource(
  "dynamodb",
  region_name="ap-northeast-1",
  endpoint_url=os.getenv("DYNAMO_DB_LOCAL_END_POINT"),
  aws_access_key_id="dummy",
  aws_secret_access_key="dummy"
) if is_local() else resource("dynamodb")
