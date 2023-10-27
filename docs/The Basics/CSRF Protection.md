---
sidebar_position: 3
---

# CSRF Protection

## Introduction
クロスサイトリクエストフォージェリは、認証されたユーザーに代わって不正なコマンドが実行される悪意のあるエクスプロイトの一種です。
エシカルハックでもたびたび指摘される内容です。

CSRF保護がないと、悪意のあるWebサイトがアプリケーションのルートを指し示すHTMLフォームを作成し、悪意のあるユーザー自身の電子メールアドレスを送信する可能性があります。
~~~
<form action="https://your-application.com?_path=user/email" method="POST">
    <input type="email" value="malicious-email@example.com">
</form>
 
<script>
    document.forms[0].submit();
</script>
~~~

ページが読み込まれたときに悪意のあるWebサイトが自動的にフォームを送信する場合、悪意のあるユーザーは、アプリケーションの疑いを持たないユーザーをWebサイトに誘導するだけで、アプリケーションで電子メールアドレスが変更されます。

この脆弱性を防ぐには、悪意のあるアプリケーションがアクセスできないシークレットセッション値について、すべての着信、、またはリクエストを検査する必要があります。

## CSRF リクエストの防止

アクティブな各CSRFトークンを自動的に生成しますユーザーセッションアプリケーションによって管理されます。このトークンは、認証されたユーザーが実際にアプリケーションに要求を行っているユーザーであることを確認するために使用されます。このトークンはユーザーのセッションに保存され、セッションが再生成されるたびに変更されるため、悪意のあるアプリケーションはアクセスできません。

幸いにもフレームワーク標準でこのCSRF保護を行うミドルウェアを実装しています。

現在のセッションのCSRFトークンには、リクエストのセッションまたはヘルパー関数を介してアクセスできます。

~~~
Router::middlewares(VerifyCsrfTokenMiddleware::class, function (){
    Router::map('post', 'user/email', function () use ($request) {
        $email = $request->get('email');
    });
})
~~~
~~~
<form action="https://your-application.com?_path=user/email" method="POST">
    <input type="email" value="malicious-email@example.com">
    <input type="_csrf" value="<?= csrf_token() ?>">
    <input type="_method" value="post">
</form>
~~~
Bladeテンプレートを利用する場合は、このようになります
~~~
<form action="https://your-application.com?_path=user/email" method="POST">
    <input type="email" value="malicious-email@example.com">
    <input type="_csrf" value="{{ csrf_token() }}">
    <input type="_method" value="post">
</form>
~~~

