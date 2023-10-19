---
sidebar_position: 1
---

# Local Build

### **この機能はベータテスト中です**

## ビルドインサーバーを利用して実行
いちいちSPIRALにデプロイせずともデバッグを行ってみましょう。

~~~
php spiral-framework/spiralframe app:local-build {port} {案件ディレクトリ} {ルーターファイル}
~~~

例：
~~~
php spiral-framework/spiralframe app:local-build 8000 Hoge Hoge/routes/web.php
~~~

## 使えない機能

$SPIRAL モックを読み込みます。

アカウント内API接続　事前にトークン・シークレットトークンから取得する方法で指定してください。

一部SPIRALの環境と動作が異なる場合があります。※ベータテスト中