---
sidebar_position: 2
---

# Gate

## Introduction
Gate アクセス制御の中核となるクラスです。

アクセス定義の追加: あるアクションやリソースへのアクセスを制御するロジックを定義します。

アクセスの確認: あるアクションやリソースへのアクセスが許可されているかどうかを確認します。

アプリケーションごとに特有のアクセス制限を作ることができます。

例えば、Applicationのbootでこのように定義します。
~~~
public function boot (){
    Gate::define('edit-post', function ($auth, $post) {
        return $auth->id === $post->user_id;
    });
}
~~~

コントローラーなどで、Gateのチェックを行います。
~~~
if (Gate::allows('edit-post', $post)) {
    // ユーザーが投稿を編集する権限がある場合の処理
} else {
    // 権限がない場合の処理
}
~~~
上記の例では、allows メソッドを使用して、認証されたユーザーが $post という投稿を編集できるかどうかを確認しています。

逆に、アクセスが拒否されているかどうかを確認する場合は、denies メソッドを使用します。
~~~
if (Gate::denies('edit-post', $post)) {
    // 権限がない場合の処理
}
~~~
