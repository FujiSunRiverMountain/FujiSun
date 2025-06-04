import os
import requests
from models.models import PersonalInfo, PresentationScenePrompt
from database.repository import get_information

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={GEMINI_API_KEY}"

def merge_prompt(prompt: PresentationScenePrompt, information: PersonalInfo):
  return f"""以下の情報で python-pptx を使って自己紹介スライドを生成する Python コードを作成してください。

<自己紹介情報>
{information}

<条件>
{prompt}

実行可能な Python コードだけを教えてください。
"""

def generate_with_gemini(prompt: PresentationScenePrompt, user_id: str):
  information = get_information(user_id)
  request_prompt = merge_prompt(prompt, information)

  headers = {"Content-Type": "application/json"}
  body = {
    "contents": [
      {
        "parts": [{"text": request_prompt}]
      }
    ]
  }

  response = requests.post(GEMINI_API_URL, headers=headers, json=body)

  if response.status_code != 200:
    raise Exception(f"Gemini API error: {response.status_code} - {response.text}")

  try:
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]
  except (KeyError, IndexError):
    raise Exception("Unexpected Gemini response format")
