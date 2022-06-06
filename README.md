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

## 7. JavaScript -> TypeScript に変更(React対応)
- TypeScript関連とReact関連のパッケージ追加
- ts-loaderの追加
- tsconfig.jsonを追加
  - とりあえずの対応なのでstrictはfalseにする(ごめんね)
- webpack.config.jsの設定をTypeScript用に変更
  - GlobEntriesの記述を.tsと.tsxの2種類書く(ignoreも)

Reactぽいことは何もしてない。ただ対応しただけ。

tag: step07

## 8. 画像を読み込めるようにする
- webpack.config.jsに設定を追加
- TypeScriptで画像を扱えるように[任意].d.tsファイル追加

tag: step08

## 9. CSSを扱えるようにする
- css-loader他CSS関連を追加
- package.jsonにautoprefixerの設定を追加する
- webpack.config.jsに設定を追加
  - cssの`background-image`のpathが正しく出力されるように`MiniCssExtractPlugin`にpublicPathの設定も追加
  
tag: step09

## 10. 少し改良する
- templateのファイルを`.html` -> `.ejs`に変更する
  - templateで直接参照している画像(`<img src="ここ"/>`)の記述を`require('...')`に変更する
- `webpack.config.js`の変更
  - 複数のhtmlファイルで共有するCSS(style.css)をentryに含めて出力されるようにする
  - `webpack-remove-empty-scripts`を導入し不要なファイル(style.js)が生成されないようにする
  - html出力の設定を変更
	- templateを`*.ejs`に
	- chunksに`'style'`を追加

tag: step10
	
## 11. fontファイルを扱う
- CSSに@font-faceの記述追加して任意のfontファイルを用意する
- `webpack.config.js`にfontリソースを扱う設定を追加

tag: step11

## 12. 画像のサイズで処理を分ける
小さいサイズの画像はdataURLにする。

- `webpack.config.js`の設定変更

tag: step12

## 13. CSVファイルの取り込み
おそらくバンドル時にJSONに変換されてJSファイル内に取り込まれる

- `csv-loader`の導入
- `webpack.config.js`にcsv-loaderの記述追加

tag: step13
