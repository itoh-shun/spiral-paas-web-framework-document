---
sidebar_position: 5
---

# HTTP Requests

## 要求の操作
Requestの情報はMiddleware,Controllerから取得可能です。

これらは内部的にRequest変数を持っているので直接参照が可能です。

~~~
$this->request;
~~~

Requestから値を取得するには、getを利用します。

~~~
$this->request->get('hoge', $default);
~~~

何らかの理由でリクエストに値を入れたい場合は、下記のように設定可能です。

~~~
$this->request->set('hoge', $value);
~~~