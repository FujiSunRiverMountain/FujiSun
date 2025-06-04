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

# Lambda デプロイ用 ZIP 作成（シェルスクリプト作りたい）

1. ディレクトリ移動
```
cd lambda/package
```

2. 外部ライブラリダウンロード
```
pip install --target . -r ../requirements.txt
```

3. Prod コードコピー
```
cp -r ../src/* .
```

4. Zip 生成
```
zip -r zip_lambda_deploy.zip .
```
