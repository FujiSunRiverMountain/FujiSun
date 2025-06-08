#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

set -e  # エラー時にスクリプトを停止

echo "Step1: package を初期化しています... \c"
rm -rf "$SCRIPT_DIR/package" > /dev/null 2>&1
mkdir -p "$SCRIPT_DIR/package"
echo "DONE"

echo "Step2: pip freeze で requirements.txt を更新しています... \c"
cd "$SCRIPT_DIR/package"
pip freeze > "$SCRIPT_DIR/requirements.txt" 2> /dev/null
echo "DONE"

echo "Step3: ライブラリをインストールしています... \c"
pip install --target . -r "$SCRIPT_DIR/requirements.txt" > /dev/null 2>&1
echo "DONE"

echo "Step4: ソースコードをコピーしています... \c"
cp -r "$SCRIPT_DIR/src/"* . > /dev/null 2>&1
echo "DONE"

echo "Step5 zip ファイルを作成しています... \c"
zip -r "$SCRIPT_DIR/lambda_deploy.zip" . > /dev/null 2>&1
echo "DONE"
