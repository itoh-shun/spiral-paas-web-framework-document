---
sidebar_position: 6
---

# HTTP Response

## Introduction
SPIRALではHeader関数が使えない以上、できることが限られています。


## JSON レスポンス
APIを実装するときなんかに利用できます。
~~~
echo response()->json([
    'name' => 'Abigail',
    'state' => 'CA',
]);
~~~

このように表示してあげることで、Jsonのレスポンスを簡単に作ることができます。