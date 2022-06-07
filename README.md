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
- `clean-webpack-plugin`を追加
- webpack.config.jsにclean-webpack-pluginの設定を追加

tag: step03

## 4. 複数ファイルを出力できるようにする
- `webpack-watched-glob-entries-plugin`を追加
- webppack.config.jsに設定を追加

個別出力しないJSファイルはignore設定に書くので出力ファイル数が少ない場合はwebpack-watched-glob-entries-pluginを使わずにentryオプションに直接書いたほうがよいかも。

tag: step04

## 5. 複数のhtmlファイル出力を試す
- `html-webpack-plugin`を追加
- webppack.config.jsに設定を追加

ここでのやり方は暫定措置
用意するhtmlファイルと出力するhtmlファイルで名前が違う場合は有用。
ただしファイルごとに設定を書かなければならない。

tag: step05


## 6, 複数のhtmlファイルを動的に出力する
- `html-webpack-plugin`を追加(step5で追加したもの)
- webppack.config.jsに設定を追加
  - require('fs')追加※出力JSとhtmlに差がある場合を考慮しfilterをかける

tag: step06

## 7. JavaScript -> TypeScript に変更(React対応)
- TypeScript関連とReact関連のパッケージ追加
- `ts-loader`の追加
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
- `css-loader`他CSS関連を追加
- package.jsonにautoprefixerの設定を追加する
- webpack.config.jsに設定を追加
  - cssの`background-image`のpathが正しく出力されるように`MiniCssExtractPlugin`にpublicPathの設定も追加
  
tag: step09

## 10. 少し改良する
- templateのファイルを`.html` -> `.ejs`に変更する
  - templateで直接参照している画像(`<img src="ここ"/>`)の記述を`require('...')`に変更する
- `webpack.config.js`の変更
  - 複数のhtmlファイルで共有するCSS(style.css)をentryに含めて出力されるようにする
  - `webpack-remove-empty-scripts`を追加し不要なファイル(style.js)が生成されないようにする
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

- `csv-loader`を追加
- `webpack.config.js`にcsv-loaderの記述追加

tag: step13

## 14. ESLint導入
- ESLint関連のパッケージ追加と関連ファイルの作成(.eslintignore,.eslintrc.js)
  - `npx eslint init`で初期設定をする
  - Webpack5では`eslint-loader`は非推奨、`eslint-webpack-plugin`を入れる
- `webpack.config.js`にESLintの設定追加
- package.jsonのscriptsにESLint実行コマンド追加(lint)

tag: step14

## 15. 開発(development)と公開(production)でwebpack処理を分ける(仮)
- `imagemin-webpack-plugin`,`imagemin-mozjpeg`を追加
  - `imagemin-mozjpeg`は2022.06.07時点では最新の@10.0.0だとエラーになるので@9.0.0にする
- `terser-webpack-plugin`を追加
- `webpack.dev.js`,`webpack.prod.js`,`webpack.common.js`を作成する
  - `browser-sync`を使わず`webpack-dev-server`をそのまま使う
  - `webpack.prod.js`には最適化処理などを追加する
  - `package.json`のscriptsを編集する
  - 比較用としてこれまで使ってきた`webpack.consig.js`は削除せず残しておく

tag: step15

## 16. htmlテンプレートにmetaやOGPタグサンプルの追加とfaviconの導入
Webpackからの挿入はしないが一般的なmetaタグやOGPタグのサンプルをコメントアウトした状態で追加。htmlファイルごとに(ページごとに)差異がある情報をWebpackで扱うのは違うと考えテンプレート側にコメントアウトの形で追加した。

- `webpack.config.js`,`webpack.common.js`にfaviconを挿入する処理を追加
  - ファビコンとファルコンてちょっと似てるよね

tag: step16


# 総括
もっとスマートな設定があればいいと思うがどうなんでしょう。

## 渋々インストールしたパッケージ
- clean-webpack-plugin
  - 掃除する処理が標準に組み込まれればいいのに......
- terser-webpack-plugin
  - vendorとして切り分けられたJSのライセンス情報をファイル内にバンドルさせるために使った。ライセンステキスト気にしないならいらない。
- webpack-watched-glob-entries-plugin
  - entryを直接指定するならいらない
- webpack-remove-empty-scripts
  - CSSをエントリーに加えた際に作られる不要なJSを消すためにやむなく導入。標準機能で拡張子で処理分けできるようになればいいのに。
- imagemin-mozjpeg
- imagemin-webpack-plugin
  - 画像圧縮のため導入。現状ダウングレードしないと使えないというメンテナンスに不安があるパッケージ。
  
