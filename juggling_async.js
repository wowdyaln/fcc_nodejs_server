/*
## 玩轉非同步 (練習題 9 之 13)

  這個習題和前一個習題（HTTP COLLECT）有點類似，您同樣需要使用 http.get()
  方法。不過，這次您會從前三個命令列參數取得 三個 URL（網址）。

  您必須把每個網址的內容收集完整以後才顯示在終端機（標準輸出，stdout）上。您
  只要把資料以 String 的方式顯示就好，一個網址一行，不用顯示資料長度。
  重點是，您 必須以命令列參數的順序顯示這些資料。

 ─────────────────────────────────────────────────────────────────────────────
 ## 提示

  不要預期這三個伺服器都正常運作！他們給您完整的回應的順序不一定如您預期，因
  此您不能天真地在拿到資料的時候就印出來，因為它們的順序可能會亂掉。

  您將需要持續追蹤有多少網址回應他們的完整內容，並把結果按照順序排好。一旦您
  全部完成了，就可以把這些資料顯示在終端機上。

  計算 callback 函式被呼叫的次數是 Node 中管理非同步（async）的重要方法之一。您可能會發現使用第三方函式庫像
  [async](https://npmjs.com/async) 或是 [after](https://npmjs.com/after)
  會比起自己做還要方便。但是在這個習題中，請您自己在沒有任何外部函式庫的幫助
  下自己嘗試。
*/

/*不懂如何開始，看網路上的
https://github.com/nodeschool/discussions/issues/440
sunlee-newyork commented on 5 May 2016
///////
var http = require('http')
var bl = require('bl')

var responseList = []
var args = process.argv

function storeResponse(i, end) {
  http.get(args[i], (response) => {
    response.pipe(bl((err, data) => {
      if (err)
        return console.error(err)

      console.log(data.toString())
      responseList.push(data.toString())
    }))

    i++

    if (i < end)
      storeResponse(i, end)
  })
}

storeResponse(2, args.length)
*/

/* 按照上面寫一次
var http = require('http')
var bl = require('bl')
var responseList = []
var argvs = process.argv

function storeResponse(i, end){
  http.get(argvs[i], function(res){
    res.pipe(bl(function (err, data){
      if (err) return console.error(err)

      console.log(data.toString())
      responseList.push(data.toString())
    }))

    i++

    if (i<end) storeResponse(i,end)
  })
}

storeResponse(2, argvs.length)
*/

/*官方答案
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3) // yay! we are the last one!
        printResults()
    }))
  })
}

for (var i = 0; i < 3; i++)
  httpGet(i)
*/

/*依照官方答案稍稍改寫

*/
var http = require('http')
var bl = require('bl')
var responseList = []
var count = 0
var end = process.argv.length-2

function printRes(){
  for (var i = 0; i < end ; i++)
    console.log(responseList[i])
}

function httpGet(index){
  http.get(process.argv[2 + index], function(res){
    res.pipe(bl(function(err, data){
      if (err) return console.error(err)

      responseList[index] = data.toString()
      count++

      if (count == end)
        printRes()
    }))
  })
}

for (var i = 0; i < end; i++)
  httpGet(i)