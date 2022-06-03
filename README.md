# study-webpack5
Webpack5での設定のやり方を試す。

## 1. はじめの一歩
- package.jsonにscript追加
- webpack.config.jsでmodeをNODE_ENVから取得
- devServerの設定を入れる

tag: step01

## 2. JSファイルをバンドルしないを試す
- webpack.config.jsのentryに複数ファイルの設定を記述
- webpack.config.jsのoutputの設定を変更
- index.htmlのJS読み込みの記述を変更

tag: step02

## 3. distディレクトリを掃除するプラグイン導入
- clean-webpack-pluginのインストール
- webpack.config.jsにclean-webpack-pluginの設定を追加

tag: step03

