---
sidebar_position: 1
---

# Routing

## Basic Routing

最も基本的なルートはURIとクロージャを受け入れ、複雑なルーティング設定ファイルなしでルートと動作を定義する非常にシンプルで表現力豊かな方法を提供します。

~~~
use framework\Routing\Router;
 
Router::map("GET", "/greeting", function () {
    return 'Hello World';
});
~~~

### The Default Route Files
すべてのルートは、ディレクトリにあるルートファイルで定義されます。

routes/web.php

routes/api.php

ほとんどのアプリケーションでは、まずファイルにルートを定義します。
定義された経路は、定義した経路のURLをブラウザに入力することでアクセスできます。たとえば、ブラウザで次のルートに移動すると、次のルートにアクセスできます。
http://example.com/?_path=user

~~~
use App\Http\Controllers\UserController;
 
Router::map("GET",  "/user",  [UserController::class, 'index']);
~~~


ファイルで定義されたルートは、ルート グループ内で によってネストされます。
このグループ内では、URI プレフィックスが自動的に適用されるため、ファイル内のすべてのルートに手動で適用する必要はありません。クラスを変更することで、プレフィックスおよびその他のルート グループ オプションを変更できます。

### 使用可能なルーター方式
ルーターでは、任意のHTTP動詞に応答するルートを登録できます。
~~~
Router::map("GET",  $url,  $callback);
Router::map("POST",  $url,  $callback);
Router::map("PUT",  $url,  $callback);
Router::map("PATCH",  $url,  $callback);
Router::map("DELETE",  $url,  $callback);
~~~

POSTやGETはFormのmethodで指定できますが、Spiralはどちらも同一のものと処理されます。
そこで、これらのマッピングは _method というキーを持つリクエストで処理されます。
つまり、HTMLであればこのように指定することで、処理されます。
~~~ 
<input type="hidden" name="_method" value="get">
<input type="hidden" name="_method" value="post">
<input type="hidden" name="_method" value="put">
<input type="hidden" name="_method" value="patch">
<input type="hidden" name="_method" value="delete">
~~~
### url変数の利用
ルーティングに使用するURLには変数を利用することができます。
例えば、
http://example.com/?_path=user/1

このように、user/{userId} のような変数を利用したい場合は下記のように記述します。

~~~
Router::map("GET",  'user/:userId', function ($vars) {
    var_dump($vars['userId']); // 1
});
~~~

このように、:hoge と指定すると、Routerのコールバック関数の第一引数にある、$varsに配列として渡されます。
これによって、User情報の中からUserIdが1の人を取得するロジックを書くことが可能になります。

### 依存関係の挿入
SPIRALでは禁止関数が多く依存性注入ロジックを実現するのにかなり苦労しました。
このように手動で設定できるようにしています。

~~~
Router::map("GET",  $url, function ($vars , HogeService $hogeService) {
    // ...
})->service( new HogeService() );
~~~

### リダイレクト
header関数が使えないため、PHPでのリダイレクトは不可能です。
そこで、このフレームワークは特定機能から別のルーティングのソースコードを呼び出すことに成功しました。

具体例を出しましょう。
例えば、

~~~
Router::map("GET",  /, [ WelcomeController::class , 'index' ]);


Router::map("GET",  /user/:userId, function($vars){
    echo "UserId:". $vars["userId"];
});
~~~

といったルーティングがあるとします。
ここで、/user/:userIdにアクセスしたときに、自分自身の情報ではない参照をしたときは、WelcomeControllerにリダイレクトしたい場合が多々あると思います。
そんな時はこのように指定します。
~~~

Router::map("GET",  /user/:userId, function($vars){
    $request = new Request();
    $auth = auth(); 
    if($auth->userId !== $vars["userId"]){
        //ログインしている人と同じIdではない場合
        Router::redirect('/', $request);
        exit;
    }

    echo "UserId:". $vars["userId"];
});
~~~

これによって、条件によるフィルターをかけ、あたかもリダイレクトしているかのようなふるまいが実装できます。

## CRUD の一括設定
Router::resourceを使用することで、一括でCRUDのルーティングが設定できます。

一貫性のある設定が可能なので、API開発などに利用できます。

~~~
Router::resource('resource' , HogeController::class);
~~~

とすると、このようなルーティングが実装されたものと同一の動作を行います。

~~~
Router::map('GET', "/resource", [HogeController::class , 'index']);
Router::map('GET', "/resource/create", [HogeController::class , 'create']);
Router::map('POST', "/resource", [HogeController::class , 'store']);
Router::map('GET', "/resource/:id", [HogeController::class , 'show']);
Router::map('GET', "/resource/:id/edit", [HogeController::class , 'edit']);
Router::map('PUT', "/resource/:id", [HogeController::class , 'update']);
Router::map('DELETE', "/resource/:id", [HogeController::class , 'destroy']);
~~~