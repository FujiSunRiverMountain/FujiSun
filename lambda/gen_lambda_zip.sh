#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

set -e  # エラー時にスクリプトを停止

echo "Step1: package を初期化しています... \c"
rm -rf "$SCRIPT_DIR/package" > /dev/null 2>&1
rm -f "$SCRIPT_DIR/lambda_deploy.zip" > /dev/null 2>&1
mkdir -p "$SCRIPT_DIR/package"
cd "$SCRIPT_DIR/package"
echo "DONE"

echo "Step2: ライブラリをインストールしています... \c"
pip install \
  --platform manylinux2014_aarch64 \
  --implementation cp \
  --python-version 3.13 \
  --only-binary=:all: \
  --target . \
  -r "$SCRIPT_DIR/requirements.txt" > /dev/null 2>&1
echo "DONE"

echo "Step3: ソースコードをコピーしています... \c"
rsync -a --exclude='__pycache__' "$SCRIPT_DIR/src/" . > /dev/null 2>&1
echo "DONE"

echo "Step4: zip ファイルを作成しています... \c"
zip -r "$SCRIPT_DIR/lambda_deploy.zip" . > /dev/null 2>&1
echo "DONE"
