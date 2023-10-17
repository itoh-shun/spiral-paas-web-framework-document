---
sidebar_position: 7
---

# Views
ルートやコントローラから直接HTMLドキュメントの文字列全体を返すことは実用的ではありません。
ViewはすべてのHTMLを別々のファイルに配置する便利な方法を提供します。

~~~
<!-- View stored in resources/html/greeting.blade.php -->
 
<html>
    <body>
        <h1>Hello, {{ $name }}</h1>
    </body>
</html>
~~~

~~~
Route::map('/', function () {
    echo view('html.greeting', ['name' => 'James']);
});
~~~

## Blade ONE Template
このフレームワークはLaravelに搭載されているBladeと近しいエンジンを搭載しているBladeONEを内部実装しています。

詳しい情報は下記サイトをご確認ください

https://github.com/EFTEC/BladeOne

### 特に覚えておく機能

Balde はサニタイズを簡単に実行してくれます。
PHPから値を出力するときはこのように出力しましょう
hoge.blade.php
~~~
<div>{{ $userName }}</div>
~~~

これだけで、例えば
~~~
$userName = "<script>alert()</sciprt>";
~~~
といった変数の値も、サニタイズした状態で出力してくれます。

サニタイズをどうしても解除したい場合は、
~~~
<div>{!! $userName !!}</div>
~~~
としましょう。