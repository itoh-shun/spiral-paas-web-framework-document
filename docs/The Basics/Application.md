---
sidebar_position: 1
---

# Application

## Introduction
アプリケーションの共通の事前設定が行えます。
デフォルトではこのようになっています。
~~~
<?php

namespace Hoge;

use framework\Application;

class HogeApplication extends Application
{
    public function __construct()
    {
        config_path("Hoge/config/app");
        parent::__construct();
    }

    public function boot()
    {
    }
}
~~~

config_pathは config();のヘルパーで取得するファイルのパスを設定します。


## boot
あらゆる事前設定が可能です。
初期設定などがある場合はここに記載しましょう。