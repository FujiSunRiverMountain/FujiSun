import os

def is_local():
  return "AWS_LAMBDA_FUNCTION_NAME" not in os.environ

def build_config():
  if is_local():
    from dotenv import load_dotenv
    load_dotenv()