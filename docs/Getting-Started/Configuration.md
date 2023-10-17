---
sidebar_position: 1
---

# Configuration

## アプリケーション共通の設定を行いましょう

configファイルは下記ディレクトリに存在します。
~~~
<dir>/src/<project_name>/config/app.php
~~~

中身はこのようになっています。
~~~
<?php
return [
    "debug" => false,
    "name" => "<project_name>",
    "timezone" => "Asia/Tokyo",
    "locale" => "ja",
];
~~~

基本的に設定せずとも使うことができますが、ここに記載した設定はPHPファイル内で、このように呼び出すことができます。

~~~
config(<configのKey>, <値が存在しない場合に取得する値>);
~~~

このように設定したら、例えば開発の環境の場合のみデバッグをしたい場合は、
~~~
if(config('debug', true)){
    var_dump('== debug! ==');
}
~~~
といった処理が可能になります。

また、コンフィグにこのように設定すると
~~~
<?php
return [
    "debug" => false,
    "name" => "<project_name>",
    "timezone" => "Asia/Tokyo",
    "url" => [
        'web' => "%weburl%",
        'api' => "%apiurl%",
    ],
];
~~~
このように取得できます
~~~
config('url.web', ''); //%weburl%
~~~

便利な機能なので覚えておきましょう