# 設計書

## コード実装する前に考えること

1. 既存のストップウォッチ UI を参考にし、必要最低限の構成を把握する(003-タイマーを参考、復讐のため初めから作成するかも)
2. 「状態(state)」を洗い出す
3. 型の定義をする
4. ゲームの「状態遷移」を言葉で整理する
5. 外部の時間・API・イベントの「副作用」を使うのはいつ？

## ググり調査やメモ

- 003-timerとはまた違うUIにする
- 小数第3以下まで表示：mm:ss.xxx
- ストップウォッチのラップは2種類あること
  - スプリット（区間タイム）
    - 前のラップからどれだけ時間がかかったか
  - トータル（累積タイム）
  - スタートから現在までの合計時間
- ラップ表示にラップ数（Lap 1,Lap 2）を表示する
- state（状態）は**表示用文字列を持たない**
- useRefを使用する

## 状態(state)

- status
  - ブラウザが表示された状態（初期状態）： idle
  - 計測中： running
  - 停止： stopped
- ラップ数（配列で保持）： laps
- 経過時間（ミリ秒）： elapsedTime

## 型定義

```ts
// 表示
type Status = "idle" | "running" | "stopped";

// ラップ
type Lap = {
  lap: number;
  lapTime: number; // ms
  totalTime: number; // ms
};

// 経過時間
// elapsedTime はミリ秒を number 型で管理する
```

## 状態遷移

- 初期状態
  - status = "idle"
  - elapsedTime = 0
  - laps = []
- 開始ボタンを押す
  - status "running"
- 再生中
  - Date.now()を用いて実時間差分で、elapsedTime を算出
  - 表示時に mm:ss.xx にフォーマット
- ラップボタンを押す
  - laps = [{ lap: 1, lapTime: 10730, totalTime: 10730 }] <!-- 10730 → 00:00:10.73 -->
- 停止ボタンを押す
  - status = "stopped"
  - elapsedTime 停止
- 再生ボタンを押す
  - status = "running"
  - elapsedTime 再び増加
- リセットボタンを押す
  - status = "idle"
  - elapsedTime = 0
  - laps = []

## 副作用

- status が "running" のとき、タイマー処理を開始
- setInterval で定期的に再描画
- 経過時間は Date.now() 差分で算出
- status 変更時 / アンマウント時にクリーンアップ
