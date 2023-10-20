---
sidebar_position: 14
---

# BatchScheduler

## カスタムプログラム用実行機能
名前の通りバッチをスケジューリングできる機能です。

## Class BatchScheduler
app:init をすると、batch.phpが生成されます。
このような記載があります。
~~~
$batchScheduler = new BatchScheduler();

// $batchScheduler->addJob((new HogeBatch())->everyMinute());

$batchScheduler->runJobs();
~~~
BatchSchedulerは基本的なベースになるクラスです。
このクラスにJobをAddしましょう。

###  バッチジョブの作成
BatchJobクラスを継承して、独自のバッチジョブクラスを作成します。この際、handleメソッドをオーバーライドして、バッチジョブで行いたい具体的な処理を記述します。

~~~
touch app/Batch/HogeJob.php
~~~
~~~
<?php
namespace JoyPla\Batch;
use framework\Batch\BatchJob;

class HogeJob extends BatchJob
{
    public function handle(): void
    {
        echo "バッチジョブが実行されました！";
    }
}
~~~
このようにしてJobファイルを作ります。
もちろん、handleのなかでSpiralDBクラスを利用することも可能です。

### Jobを追加しましょう。
batch.phpに追加します。

~~~
$batchScheduler->addJob((new HogeJob())->everyMinute());
~~~

### スケジュールの設定
次に、作成したバッチジョブのインスタンスを生成し、どのタイミングで実行するかのスケジュールを設定します。

設定は15分単位で指定が可能です。

#### 毎回実行
~~~
$job->everyMinute();
~~~

#### 15分ごとに実行(毎回実行)
~~~
$job->everyFifteenMinutes();
~~~

#### 2時間ごとに実行 (2時間毎の00分に)
~~~
$job->everyTwoHours();
~~~

#### 3時間ごとに実行 (3時間毎の00分に)
~~~
$job->everyThreeHours();
~~~

#### 4時間ごとに実行 (4時間毎の00分に)
~~~
$job->everyFourHours();
~~~

#### 6時間ごとに実行 (6時間毎の00分に)
~~~
$job->everySixHours();
~~~

#### 毎日実行 (毎日00:00時に)
~~~
$job->daily();
~~~

#### 指定した時間に毎日実行
~~~
$job->dailyAt('12:30');
~~~

#### 1日に2回指定した時間に実行
~~~
$job->twiceDaily('09:00', '18:00');
~~~

#### 毎週実行 (毎週日曜日の00:00時に)
~~~
$job->weekly();
~~~

### カスタムプログラムに設置
~~~
<?php 
require_once "{project_name}/routes/batch.php";
~~~
実行時間は毎時15分の実行に設定してください。
