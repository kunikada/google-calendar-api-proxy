FROM node:22-slim

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの作成
WORKDIR /workspaces/google-calendar-proxy

# 非rootユーザー（node）がsudoを使えるようにする
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# デフォルトユーザーをnodeに設定
USER node

# グローバルにclaspをインストール
RUN npm install -g @google/clasp@latest

# コマンドライン出力用の色を設定
ENV TERM=xterm-256color

# コンテナが起動したときのデフォルトコマンド
CMD ["bash"]
