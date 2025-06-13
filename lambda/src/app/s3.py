import boto3
from config import is_local

s3 = boto3.client("s3")

BUCKET_NAME = "download-slide"

def upload_pptx_to_s3(ppt_data: bytes, object_key: str):
  if is_local():
    with open("test.pptx", "wb") as f:
      f.write(ppt_data)
    return

  s3.put_object(
    Bucket=BUCKET_NAME,
    Key=object_key,
    Body=ppt_data,
    ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation"
  )


def gen_presigned_url(object_key: str):
  if is_local():
    return 'testURL'

  return s3.generate_presigned_url(
    ClientMethod = 'get_object',
    Params = {'Bucket' : BUCKET_NAME, 'Key' : object_key},
    ExpiresIn = 30,
    HttpMethod = 'GET'
  )