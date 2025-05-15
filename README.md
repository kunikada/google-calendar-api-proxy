# Google Calendar Proxy API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4%2B-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green)](https://nodejs.org/)

Google Apps Scriptを使用して、Googleカレンダーの予定を取得するRESTful APIを提供します。OAuthを必要とするGoogle Calendar APIを使わずに簡易的なAPIを提供します。

## 機能

- Google カレンダーの予定を取得するRESTful API
- APIキーによる認証（オプション）
- 指定期間の予定取得
- OAuthの複雑な設定なしで利用可能

## 開発環境

このプロジェクトはDevcontainerを使用しています。VS Codeと連携して使用することで、一貫した開発環境を提供します。

### 技術スタック

- Node.js 22以上
- Google Apps Script
- clasp 3.x
- TypeScript

### 必要条件

- Docker
- Visual Studio Code
- VS Code Dev Containers - 拡張機能

### セットアップ手順

1. リポジトリをクローン
2. VS Codeで開く
3. 「Reopen in Container」を選択
4. コンテナ内でGoogle Apps Script開発環境が自動的に構築される

### 開発コマンド

```bash
# Google アカウントにログイン
npm run login

# 新しいGoogle Apps Scriptプロジェクト作成
npm run create

# TypeScriptのビルド
npm run build

# 変更を監視してビルド
npm run watch

# ビルドしてプッシュ（開発時に便利）
npm run dev

# ローカルファイルをGoogle Apps Scriptにプッシュ
npm run push

# Google Apps Scriptからファイルをプル
npm run pull

# Google Apps Scriptエディタを開く
npm run open

# デプロイ
npm run deploy
```

## 使用方法

### 初期セットアップから、デプロイまでの手順

以下の手順で、何もない状態からGoogleカレンダーAPIをデプロイして使用できるようになります：

1. **事前準備**
   - Dockerをインストール
   - Visual Studio Codeと「Dev Containers」拡張機能をインストール

2. **プロジェクトのクローンと開発環境の準備**
   ```bash
   # リポジトリをクローン
   git clone https://github.com/kunikada/google-calendar-proxy.git
   cd google-calendar-proxy
   
   # VS Codeで開く
   code .
   ```
   
3. **開発コンテナを起動**
   - VS Code左下の「><」アイコンをクリックして「Reopen in Container」を選択
   - コンテナのビルドと環境構築が完了するまで待つ

4. **Googleアカウントの認証**
   ```bash
   npm run login
   ```
   - ブラウザが開き、Googleアカウントでログインするよう促されます
   - 認証が完了すると、ターミナルに成功メッセージが表示されます

5. **Google Apps Scriptプロジェクトの作成**
   ```bash
   npm run create
   ```
   - プロジェクト名の入力を求められます
   - スクリプトIDが生成されるので、メモしておくと便利です

6. **ソースコードのビルドとプッシュ**
   ```bash
   # TypeScriptコードをビルド
   npm run build
   
   # Google Apps Scriptにプッシュ
   npm run push
   ```

7. **Webアプリケーションとしてデプロイ**
   ```bash
   # Google Apps Scriptエディタを開く
   npm run open
   ```
   - Google Apps Scriptエディタが開きます
   - 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」を選択
   - 実行するユーザー：「自分（あなたのメールアドレス）」
   - アクセスできるユーザー：必要に応じて設定（「全員がアクセス可能」など）
   - 「デプロイ」をクリック
   - デプロイ後、WebアプリケーションのURLが表示されます
   - このURLをコピーしてください（これがAPIのエンドポイントになります）
   
   または、コマンドラインからデプロイする場合：
   ```bash
   # デプロイ（注：URLは表示されません）
   npm run create-deployment
   
   # デプロイ情報の確認
   npx clasp list-deployments
   ```
   - `list-deployments`コマンドでデプロイIDが表示されます
   - WebアプリケーションのURLは以下の形式になります：
     `https://script.google.com/macros/s/<デプロイID>/exec`

8. **APIの使用**
   - 上記のステップで取得したURLを使用してAPIにアクセスできます
   - 例: `https://script.google.com/macros/s/<デプロイID>/exec?startDate=2025-05-01&endDate=2025-05-31`
   - APIキーを設定している場合は、APIリクエストにキーを含める必要があります
   - 詳細なAPI使用方法は、`docs/api-usage.md`を参照してください

### APIドキュメント

APIのドキュメントについては、`docs/api-usage.md`を参照してください。
claspコマンドの一覧と説明は、`docs/clasp-commands.md`を参照してください。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 謝辞

- [Google Apps Script](https://developers.google.com/apps-script) - このプロジェクトのバックエンドを提供
- [clasp](https://github.com/google/clasp) - Google Apps Scriptのローカル開発ツール
