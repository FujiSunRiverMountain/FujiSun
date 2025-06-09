import os
import requests
from models.models import PersonalInfo, PresentationScene
from database.personal_info_table import get_information

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={GEMINI_API_KEY}"

def merge_information(presentation_scene: PresentationScene, information: PersonalInfo):
  return f"""以下の情報で python-pptx を使って自己紹介スライドを生成する Python コードを作成してください。
  
<自己紹介情報>
{information}

<条件>
この自己紹介スライドの利用シーンは以下の通りです。
{presentation_scene.information}

以下の制約を守ってください：
- 実行環境は AWS Lambda です。アーキテクチャは arm64 です。ランタイムは Python3.13 です
- `from pptx` 系などの必要なインポート文もすべて含めてください
- コードブロック（```python や ```）は一切つけずに、**純粋なPythonコードだけ**を出力してください
- `BytesIO` は外部でインポート・注入されるため、`from io import BytesIO` は書かないでください
- スライドを保存する際は `output = BytesIO()` を使用し、`prs.save(output); output.seek(0)` を行ってください
- 最後に `response = output` と定義してください（この `response` が呼び出し側で使われます）

コードは以下のように実行されます。
<コード> に当てはまるコードだけを教えてください。
```
from io import BytesIO
namespace = {{"BytesIO": BytesIO}}

exec(<コード>, namespace)
```
"""

def generate_pptx_code(presentation_scene: PresentationScene, user_id: str):
  information = get_information(user_id)
  request_prompt = merge_information(presentation_scene, information)

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
