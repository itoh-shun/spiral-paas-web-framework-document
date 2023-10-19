---
sidebar_position: 13
---

# ServiceProvider

## ServiceProvider とは
SPIRALではDIコンテナを作ることができません。
それはReflectionAPIを利用することができず、クラスが求めている型を自動的に判別することが不可能だからです。
そのため、このフレームワークでは、ServiceProviderというものを用意しました。
これを利用することで、事前に定義されたNameに対応する値を取得することができます。

## 使い方
ServiceProviderは基本的にApplicationの function boot にて定義を行います。
~~~
public function boot() {
    $this->serviceProvider->register('Hoge', function($sercviceProvider){
        return "hoge";
    });
}
~~~

そしてここで登録したサービス情報は、MiddlewareやControllerで利用できます。

~~~
class HogeController extends Controller {

    public function index($vars) {
        $name = $this->serviceProvider->get('Hoge');
        echo $name ; // "hoge"
    }
}
~~~

このようにして値を取得することが可能です。

## 便利な使い方
例えばこんなのはどうでしょうか。
~~~
use framework\Application;
use framework\SpiralConnecter\SpiralDB;

class HogeApplication extends Application
{
    public function boot()
    {
        $this->serviceProvider->register('UserDB', function($sercviceProvider){
            return SpiralDB::title('UserDB')->fields([
                'id',
                'name',
                'email'
            ]);
        });
    }
}
~~~

UserDBの設定情報をあらかじめ定義し、serviceProviderに登録します。
すると、Controllerではこのような書き方で完結します。

~~~
class HogeController extends Controller {
    public function index($vars) {
        $userDb = $this->serviceProvider->get('UserDB');
        $users = $userDb->get();
    }
}
~~~

このようにして実装にかかる面倒を減らすことができます。
さらに、serviceProviderは外部注入の考え方をもとにしているので、
このようにモックでの対応も可能になります。

~~~
use framework\Application;
use framework\SpiralConnecter\SpiralDB;

class HogeApplication extends Application
{
    public function boot()
    {
        $this->serviceProvider->register('UserDB', function($sercviceProvider){
            return new class {
                public function get(){
                    return collect([
                      [
                        'id' => 1,
                        'name' => 'test',
                        'email' => 'test@hoge.com',
                      ]  
                    ]);
                }
            };
        });
    }
}
~~~

DBに直接アクセスせず、Mockのテスト用にサービスを作ることが可能になります。
もちろんコントローラーの記載を変える必要はありません。

~~~
class HogeController extends Controller {
    public function index($vars) {
        $userDb = $this->serviceProvider->get('UserDB');
        $users = $userDb->get(); //Mockの値が取得される
    }
}
~~~