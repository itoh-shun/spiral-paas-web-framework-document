---
sidebar_position: 2
---

# Middleware

## Introduction
ミドルウェアは、アプリケーションに入る HTTP 要求を検査およびフィルタリングするための便利なメカニズムを提供します。ミドルウェアは要求をアプリケーションのさらに先に進むことを許可します。

## ミドルウェアの定義
新しいミドルウェアを作りましょう。
~~~
touch src/app/Http/Middleware/TestMiddleware.php
~~~

ミドルウェアに数の制約はありません。

### ミドルウェアと応答
ミドルウェアを設定することで、コンロトーラーが実行する前にセキュリティ要件にマッチしているか、送信される情報が正しいかなどの判定をすることができます。
いかに具体的なミドルウェアの実装方法を記載します。
~~~
<?php
 
namespace App\Http\Middleware;

use App\Http\Middleware\Middleware;
use App\Http\Middleware\MiddlewareInterface;
 
class TestMiddleware extends Middleware implements
    MiddlewareInterface
{
    public function process(array $vars)
    {
        //何かしらの処理
        return true; // true を返すことで次に進みます。
    }
}
~~~

$varsはルーティングの説明にもあったクロージャーと同様の値を取得できます

ちなみに、Middlewareにはリクエスト変数が内包しています。
~~~
public function process(array $vars)
{
    $userName = $this->request->get('userName');
}
~~~

このようにしてリクエストインスタンスからGETやPOSTされた値を取得することができます
