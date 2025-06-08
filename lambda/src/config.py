import os

def build_config():
  if "AWS_LAMBDA_FUNCTION_NAME" not in os.environ:
    from dotenv import load_dotenv
    load_dotenv()

def is_local():
  return os.getenv("ENV") == "local"