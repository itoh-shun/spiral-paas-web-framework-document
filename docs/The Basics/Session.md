---
sidebar_position: 8
---

# Session

## Sessionの操作

### データの取得
セッションデータを操作する主な方法は、グローバルヘルパーとインスタンス経由の2つです。まず、ルートクロージャまたはコントローラメソッドでタイプヒントできるインスタンスを介してセッションにアクセスする方法を見てみましょう。

~~~
class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     */
    public function show($vars): View
    {
        $value = $this->request->session()->get('key');
 
        // ...
 
        echo view('user.profile', ['user' => $user]);
    }
}
~~~

セッションから項目を取得するときに、既定値を 2 番目の引数としてメソッドに渡すこともできます。この既定値は、指定したキーがセッションに存在しない場合に返されます。クロージャをデフォルト値としてメソッドに渡し、要求されたキーが存在しない場合、クロージャが実行され、その結果が返されます。

~~~
$value = $this->request->session()->get('key', 'default');
 
$value = $this->request->session()->get('key', function () {
    return 'default';
});
~~~

### すべてのセッションデータの取得
セッション内のすべてのデータを取得する場合は、次のメソッドを使用できます。
~~~
$data = $this->request->session()->all();
~~~

### セッションに項目が存在するかどうかの確認
項目がセッションに存在するかどうかを判断するには、メソッドを使用できます。このメソッドは、アイテムが存在し、存在しない場合に戻ります。
~~~
if ($this->request->session()->has('users')) {
    // ...
}
~~~
アイテムがセッションに存在するかどうかを判断するには、その値が であっても、次のメソッドを使用できます。
~~~
if ($this->request->session()->exists('users')) {
    // ...
}
~~~
項目がセッションに存在しないかどうかを判断するには、このメソッドを使用できます。このメソッドは、項目が存在しない場合に返します。missingmissingtrue
~~~
if ($this->request->session()->missing('users')) {
    // ...
}
~~~

### データの保存
セッションにデータを格納するには、通常、要求インスタンスのメソッドまたはグローバルヘルパーを使用します。
~~~
// Via a request instance...
$this->request->session()->put('key', 'value');
~~~

### データの削除
このメソッドは、セッションからデータを削除します。セッションからすべてのデータを削除する場合は、次の方法を使用できます。
~~~
$this->request->session()->forget('name');
$this->request->session()->flush();
~~~