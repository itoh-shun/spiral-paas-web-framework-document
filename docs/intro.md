---
sidebar_position: 1
---

# Getting Started

## Windowsで始める

### VSCODEのインストール

VSCODEがインストールされていない人はインストールしましょう。
基本的にこのフレームワークはSpiralからソースコードを書くことはありません。
必ずIDEを使いましょう。

https://azure.microsoft.com/ja-jp/products/visual-studio-code/

#### おすすめ拡張機能（推奨）
Beauty : https://marketplace.visualstudio.com/items?itemName=yhpnoraa.beauty

Git Graph : https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph

Laravel Blade Snippets : https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade

PHP Intelephense: https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client

### wsl2 のセットアップ
このフレームワークはwsl2の仮想環境を利用して開発を行います。
最新の情報はMicrosoft公式ページをご覧ください。

https://learn.microsoft.com/ja-jp/windows/wsl/install

### workspaceの作成（おすすめ）

仮想環境内に、プロジェクトを管理するworkspaceディレクトリを作ることをお勧めします。
ちなみに、/mnt/c/ といったマウントされたドライブに対してディレクトリを作ると動作がかなり遅くなります。
~~~
mkdir ~/workspace
~~~

### Git のインストール
Gitでバージョニングを行うのは基本中の基本です。
必ず入れましょう。

~~~
sudo apt-get install git
~~~

### Gitの設定

Gitのホスティング環境によって設定方法が異なりますので、ここは省略します。

### php のインストール
phpを使ってデプロイを行いますので、phpが必要になります。
以下の手順でインストールしましょう。

※SpiralのPHPに合わせましょう
~~~
sudo apt install php7.4
~~~

念のためバージョンを確認
~~~
php -v
~~~

### Composerのインストール
Composerの公式サイトにアクセスして、Downloadをクリックしましょう。
各環境に合わせたインストール方法が表示されます。
~~~
Composer公式サイト
https://getcomposer.org/
~~~

インストールが完了したら-Vコマンドで正常にインストールされたことを確認しましょう。

~~~
composer -V
~~~

## 案件開始時の手順
### ディレクトリの作成
先ほど作成したディレクトリ以下に案件用のディレクトリを作成します。

~~~
mkdir ~/workspace/{project_name}
~~~

### VSCODEの起動
ディレクトリに移動して、VSCODEを起動します。
~~~
cd ~/workspace/{project_name}
code . 
~~~

### VSCODEでterminal を開く
上部タブからTerminalを開いてください

### GithubからSubmoduleとしてフレームワークをClone
~~~
git submodule add git@github.com:itoh-shun/spiral-framework.git
~~~

### Git init
案件のソースコードをバージョン管理できるように、Gitを始めましょう。

~~~
git init
~~~

### README.md を作って疎通確認
リモートリポジトリとの疎通確認を行います。
~~~
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin ＜リモートリポジトリURLorSSH＞
git push -u origin master
~~~

無事プッシュできたことを確認しましょう。

### Spiral Framework のインストール

~~~
 php spiral-framework/spiralframe app:init
~~~

実行をすると、対話式のプログラムが実行されます。
順番に対応しましょう。

~~~
Welcome Spiral Frame !!!!
Please specify project name:＜案件名を入れる＞

  Welcome to the Composer config generator  
  
This command will guide you through creating your composer.json config.

Package name (<vendor>/<name>) [hoge/fuga]: ＜入力または、Enter＞

Description []: ＜入力または、Enter＞

Author[hoge fuga , n to skip]＜入力または、Enter＞

Minimum Stability []:＜入力または、Enter＞

Package Type (e.g. library, project, metapackage, composer-plugin) []:＜入力または、Enter＞

License []: ＜入力または、Enter＞

Would you like to define your dependencies (require) interactively [yes]? ＜入力または、Enter＞

Search for a package: ＜入力または、Enter＞

Would you like to define your dev dependencies (require-dev) interactively [yes]? ＜入力または、Enter＞

Search for a package: ＜入力または、Enter＞

Add PSR-4 autoload mapping? Maps namespace "hoge\hoge" to the entered relative path. [src/, n to skip]: n

Do you confirm generation [yes]? ＜入力または、Enter＞

~~~


### Composer.json の編集
autoload の箇所を以下に変更してください
~~~
# composer.json 
    "autoload": {
        "classmap": ["src", "spiral-framework/src"]
    },
~~~

## デプロイ設定
このフレームワークを用いることで、カスタムモジュールにデプロイを簡単にすることができます

### .env の設定
.env ファイルを生成します。
このファイル内に、トークン、シークレットトークンを設定することでデプロイを行ってくれます。

※現状はカスタムモジュールのみ

~~~
cp spiral-framework/.env.sample.php .env.php
~~~

### .env.php 内の設定
ファイルを開いて下記のように設定しましょう
~~~
<?php
return [
    'deploy' => [ 
        '<識別子>' => [
            'token' => '＜ここに入力＞',
            'secret' => '＜ここに入力＞',
        ],
    ]
];
~~~

### デプロイをしてみましょう

~~~
 php spiral-framework/spiralframe app:deploy
~~~

対話が始まります。

~~~
Welcome Spiral Frame !!!!
Please select the environment you wish to reflect. [<識別子>] :＜識別子を入力することで、対象の環境にデプロイがされます。＞
~~~

~~~
gitコマンドがインストールされている場合、差分更新が可能です。実行しますか？ [yes or no]:
~~~

yes の場合、Gitの差分があるファイルのみデプロイが行えます。
no の場合、すべてのファイルをデプロイします。

yes の場合、以下のように尋ねられます。

~~~
差分を取得するコミットIDがある場合は入力してください :
~~~

コミットIDから現在のコミットIDまたはChangeステータスのものを差分としてみます。
何も入力しないと直近のコミットIDから差分を抽出します

~~~
これらのファイルがデプロイされます。よろしいですか？ [yes or no]: 
~~~
問題なければ yes にするとデプロイが環境します。


### 直近のコミットIDから一発でデプロイする方法
上記のやり方は少々手間があります。

その場合は、--skip オプションを使いましょう。

~~~
 php spiral-framework/spiralframe app:deploy --skip

Welcome Spiral Frame !!!!
Please select the environment you wish to reflect. [<識別子>] :＜識別子を入力することで、対象の環境にデプロイがされます。＞
~~~

以上で差分をデプロイすることが可能です。

## プロジェクトをSpiralのWEBコンポーネントから呼び出す。

### Startup ファイルを require_once する

フレームワークでapp:init した構成は、デプロイするとカスタムモジュールにセットされます。
基本的にPHPが使えるページであれば設置可能ですが、推奨はマイエリアカスタムページです。

カスタムページ
~~~
<?php // <!-- SMP_DYNAMIC_PAGE DISPLAY_ERRORS=ON NAME=HOGE -->

require_once "{project_name}/StartUp/web.php";

~~~

このように記載し、プレビューで確認しましょう。