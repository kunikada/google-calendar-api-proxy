# Google Calendar API Proxy 使用方法

## 概要

このAPIはGoogle Apps Scriptを使用して構築されており、Googleカレンダーのイベントにアクセスするためのインターフェースを提供します。

## 認証

APIへのアクセスはAPIキー認証で保護できます。デフォルトでは、APIキー設定の有無によって認証の要否が自動的に決まります：

- APIキーが設定されていて空でない場合：認証が自動的に有効になり、APIリクエストにはAPIキーの提供が必要になります
- APIキーが設定されていない、または空の場合：認証は無効となり、APIキーなしでアクセス可能になります

APIキーを設定するには、`setupApiKey()`関数を使用します。

## エンドポイント

### イベント一覧取得

指定された期間のカレンダーイベントを取得します。

**URL**: `https://script.google.com/macros/s/{SCRIPT_ID}/exec`

**メソッド**: `GET`

**必須パラメータ**:
- `startDate`: 開始日 (ISO 8601形式, 例: "2023-01-01T00:00:00Z")

**オプションパラメータ**:
- `endDate`: 終了日 (ISO 8601形式)。未指定の場合は開始日の1日分のみ取得
- `calendarIds`: カンマ区切りのカレンダーID文字列。指定なしの場合、すべてのカレンダーから取得
- `apiKey`: API認証キー (認証が有効な場合のみ必須)

**リクエスト例**:

```
GET https://script.google.com/macros/s/{SCRIPT_ID}/exec?startDate=2023-01-01T00:00:00Z&endDate=2023-01-31T23:59:59Z&calendarIds=primary,secondary@gmail.com
```

**レスポンス例**:

```json
{
  "events": [
    {
      "id": "abc123",
      "calendarId": "primary",
      "title": "ミーティング",
      "description": "プロジェクト計画について",
      "startTime": "2023-01-15T09:00:00Z",
      "endTime": "2023-01-15T10:00:00Z",
      "location": "会議室A",
      "isAllDay": false,
      "creators": ["user@example.com"],
      "guestList": [
        {
          "email": "guest@example.com",
          "name": "ゲスト",
          "status": "YES"
        }
      ]
    },
    ...
  ]
}
```

## エラーレスポンス

エラーが発生した場合、JSONオブジェクトでエラーメッセージが返されます。

**例**:

```json
{
  "error": "Invalid API key"
}
```

## レスポンスの状態

Google Apps Scriptの制限により、HTTPステータスコードを明示的に設定することはできません。すべてのレスポンスは基本的に以下のようになります：

- 処理成功時：HTTPステータスコード200と要求されたデータ
- システムエラー時：HTTPステータスコード500（Google Apps Scriptシステムが自動的に返す）

アプリケーションロジックによるエラー（不正なパラメータ、認証エラーなど）は、HTTPステータスコード200で返され、レスポンスのJSONに上記の「エラーレスポンス」セクションのようにエラー情報が含まれます。クライアント側ではレスポンスのJSONを検証してエラーが含まれているかどうかを確認する必要があります。
