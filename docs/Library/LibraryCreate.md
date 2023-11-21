---
sidebar_position: 1
---

# Library Create

ライブラリを開発する手順です。

## リモートリポジトリの作成

まずはリモートリポジトリを作ってください。

## コマンド実行

コマンドを実行します

~~~
php spiral-framework/spiralframe library:create -u <リモートリポジトリURL>
~~~

## サブモジュール
コマンドを実行するとサブモジュールが下記ディレクトリに作成されます。

src/Library/hoge

サブモジュール内で開発してください。

# 公開を考える方へ

フレームワークでインストールできるように公開を考える方

~~~
spiral-framework/Command/Commands/LibraryInstall/librarylist.php
~~~
にリモートURLを設定してプルリクをください。