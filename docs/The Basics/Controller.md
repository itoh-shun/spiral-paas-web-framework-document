---
sidebar_position: 4
---

# Controller

## Introduction

すべてのリクエスト処理ロジックをルートファイルのクロージャとして定義する代わりに、「コントローラ」クラスを使用してこの動作を整理することをお勧めします。コントローラーは、関連する要求処理ロジックを 1 つのクラスにグループ化できます。たとえば、クラスは、ユーザーの表示、作成、更新、削除など、ユーザーに関連するすべての受信要求を処理する場合があります。デフォルトでは、コントローラはディレクトリに格納されます。


## コントローラの記述
基本的なコントローラーの例を見てみましょう。コントローラは、着信HTTP要求に応答する任意の数のパブリックメソッドを持つことができます。

~~~
<?php
 
namespace App\Http\Controllers;
 
class UserController extends Controller
{
    /**
     * Show the profile for a given user.
     */
    public function show($vars): View
    {
        echo view('user.profile', [
            'user' => SpiralDB::title('users')->findOrFail($vars['userId'])
        ]);
    }
}
~~~

コントローラのクラスとメソッドを作成したら、次のようにコントローラメソッドへのルートを定義できます。

~~~
use App\Http\Controllers\UserController;
 
Route::map('GET','/user/:id', [UserController::class, 'show']);
~~~

ちなみに、この独自コントローラーは返り値を求めません。
つまり、CleanArchitectureのような単一責任をもち、依存を持たないコントローラーを作成可能になります。

~~~
<?php
 
namespace App\Http\Controllers;
 
class UserController extends Controller
{
    /**
     * Show the profile for a given user.
     */
    public function create($vars , UserCreateUseCaseInterface $interactor): View
    {
        $name = $this->request->get('name');
        $request = new UserCreateRequest($name);
        $interactor->handle($request);
    }
}
~~~
