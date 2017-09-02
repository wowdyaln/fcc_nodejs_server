/*
## HTTP 回傳大寫字體 (練習題 12 之 13)

  撰寫一個只能接收 POST 請求的 HTTP 伺服器，這個伺服器會把收到的 POST
  內容字元轉換成大寫，並回應給客戶端。

  您的伺服器應該監聽在第一個參數所給予的 port 上。

 ─────────────────────────────────────────────────────────────────────────────

 ## 提示

  不受限的使用 request 及 response 物件的串流能力，這個習題會更簡單一點。

  有兩個不同的 npm 套件可以被用來 「轉換」 傳入的串流資料。在這個習題中，
  through2-map 套件提供最簡單的 API。

  through2-map 允許您只用一個傳入、回應一堆資料的簡單的函式建立一個 transform stream 。
  
  transform stream 指的是會對資料進行處理或運算的串流，不是只有單純的
  input/output，進去的資料會被處理過後才會輸出。 
  through2-map 這個套件可以對串流的傳輸內容做類似 Array#map() 的功能。

     var map = require('through2-map')
     inStream.pipe(map(function (chunk) {
       return chunk.toString().split('').reverse().join('')
     })).pipe(outStream)

  在前面的例子中，從 inStream 傳入的資料被轉換成 String
  （如果還沒轉換的話）， 字元順序會被反轉，並把結果傳到 outStream
  。所以我們必須先把一大堆字元反轉！記得資料的大小是取決於上游，而且您對這些
  傳入資料的控制權不大。

  要安裝 through2-map ，輸入：

     $ npm install through2-map

  如果您沒有網路連線，可以簡單地建立一個 node_modules 目錄，並把
  learnyounode 安裝目錄下，您要用的套件目錄都複製到 node_modules 目錄當中。

  file:///Users/Roro/.nvm/versions/node/v8.4.0/lib/node_modules/learnyounode
  /node_modules/through2-map

  要閱讀這跟著 learnyounode 安裝到系統上的 through2-map 模組文件，可以在瀏覽器中打開這個頁面：

  file:///Users/Roro/.nvm/versions/node/v8.4.0/lib/node_modules/learnyounode
  /docs/through2-map.html

*/

const http = require('http')
const port = process.argv[2] || 8000
var map = require('through2-map')

var server = http.createServer(function (req, response){
  req.pipe(map(function (chunk){
    return chunk.toString().toUpperCase()
  })).pipe(response)
})

server.listen(port)

/*
這裡是官方給的參考解答，以便你做參考比較：

─────────────────────────────────────────────────────────────────────────────

    var http = require('http')
    var map = require('through2-map')

    var server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }

      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })

    server.listen(Number(process.argv[2]))
*/