# study-webpack5
Webpack5での設定のやり方を試す。

## 1. はじめの一歩
- package.jsonにscript追加
- webpack.config.jsでmodeをNODE_ENVから取得
- devServerの設定を入れる

tag: step01

## 2. JSファイルをmain.jsにバンドルしない方法を試す
- webpack.config.jsのentryに複数ファイルの設定を記述
- webpack.config.jsのoutputの設定を変更
- index.htmlのJS読み込みの記述を変更

tag: step02

## 3. distディレクトリを掃除するプラグイン導入
- clean-webpack-pluginのインストール
- webpack.config.jsにclean-webpack-pluginの設定を追加

tag: step03

## 4. 複数ファイルを出力できるようにする
- webpack-watched-glob-entries-pluginの導入
- webppack.config.jsに設定を追加

個別出力しないJSファイルはignore設定に書くので出力ファイル数が少ない場合はwebpack-watched-glob-entries-pluginを使わずにentryオプションに直接書いたほうがよいかも。

tag: step04

## 5. 複数のhtmlファイル出力を試す
- html-webpack-pluginの導入
- webppack.config.jsに設定を追加

ここでのやり方は暫定措置
用意するhtmlファイルと出力するhtmlファイルで名前が違う場合は有用。
ただしファイルごとに設定を書かなければならない。

tag: step05


## 6, 複数のhtmlファイルを動的に出力する
- html-webpack-pluginの導入(step5で導入したもの)
- webppack.config.jsに設定を追加
  - require('fs')追加※出力JSとhtmlに差がある場合を考慮しfilterをかける

tag: step06
