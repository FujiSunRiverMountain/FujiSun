import boto3
from config import is_local

def upload_pptx_to_s3(ppt_data: bytes, bucket_name: str, object_key: str):
  if is_local():
    with open("test.pptx", "wb") as f:
      f.write(ppt_data)
    return

  s3 = boto3.client("s3")
  s3.put_object(
    Bucket=bucket_name,
    Key=object_key,
    Body=ppt_data,
    ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation"
  )