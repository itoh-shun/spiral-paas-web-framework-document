---
sidebar_position: 10
---

# Helper

## Introduction
フレームワークでは便利に使えるヘルパー関数を用意しています。
いくつか紹介します。

### view
Viewインスタンスを返します。
基本的にはこれを利用しましょう。
~~~
echo view('html.top');
~~~

### gate
Gateインスタンスを返します。
~~~
$gate = gate('hoge');
~~~

### collect
Collectionインスタンスを返します。
~~~
$collect = collect(['a','b','c','d','e','f']);
~~~

### config_path
Configのパスを設定します。
~~~
config_path('config/app');
~~~

### config
Configから値を取得します
~~~
config('name', 'default');
~~~

### csrf_token
csrfTokenを取得します。
~~~
csrf_token();
csrf_token(32);
~~~

### auth
マイエリアにログインしているユーザー情報を取得します。
取得には、configファイルに記載が必要になります。
~~~
<?php
return [
    'debug' => false,
    'app' => [
        'version' => '0.0.1',
        ・・・
    ],
    'auth' => [
        'fields' => [
            'id', 
            'name'
            ・・・
        ],
    ],
];
~~~

config('auth.fields')

で取得できる状態にしておいてください。

~~~
$auth = auth();
$auth->id;
$auth->name;
~~~


### spiral
Spiral インスタンスを取得します。

~~~
$SPIRAL = spiral();
~~~

