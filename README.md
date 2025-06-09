# FujiSun
for AWS practice

# 環境構築手順

前提条件：Node インストール済み

1. 下記実行
```
python3 -m venv venv
```

2. 仮想環境起動
```
source venv/bin/activate
```

3. pip upgrade
```
pip install --upgrade pip
```

4. pip install
```
pip install -r requirements.txt
```

5. other lib install
```
pip install uvicorn
```

# Lambda デプロイ用 ZIP 作成（シェルスクリプト作りたい）

1. ディレクトリ移動
```
cd lambda
```

2. zip 生成
```
sh gen_lambda_zip.sh
```
