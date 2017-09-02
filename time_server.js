/*
## 報時伺服器 (練習題 10 之 13)

  撰寫一個 TCP 時間伺服器 ！

  您的伺服器應該持續監聽在第一個參數提供的 port上。
  每個連線，您都必須以底下的格式回應當前的日期及24小時制的時間：

     "YYYY-MM-DD hh:mm"

  緊接著是一個 換行（newline） 字元。月、日、小時、時間都必須 填入零
  到成為2位數。例如：

     "2013-07-06 17:42"

 ─────────────────────────────────────────────────────────────────────────────

 ## 提示

  在這個習題中，您必須建立一個 TCP 伺服器。這裡不涉及任何 HTTP
  協議，所以您需要使用擁有完整基礎網路功能，屬於 Node 核心的 net 模組。

  這個 net 模組有一個名為 net.createServer() 的方法，這個方法需要一個
  callback 函式作為參數。不像其他的 Node callback 函式，作為參數傳入的
  callback 函式會被 createServer() 呼叫不只一次。
  
  您的伺服器所收到的每個連線都會呼叫 callback 函式。
  這個callback 函式有以下的語法特徵：

     function callback (socket) { ... }

  net.createServer() 還會回傳一個您的 server 的實例（instance）。
  您必須呼叫 server.listen(portNumber) 以開始監聽特定的 port 。

  一個標準的 Node TCP 伺服器大概像這個樣子：

     var net = require('net')
     var server = net.createServer(function (socket) {
       // socket handling logic
     })
     server.listen(8000)

  記得要使用第一個參數傳給您的 port number 。

  socket 物件包含一堆和連線有關的 meta-data ，不過這也是一個可讀、可寫的
  Node 雙工串流（duplex Stream）。在這個習題中，我們只需要寫入資料，然後關閉
  socket。

  使用 socket.write(data) 可以對 socket 寫入資料，以及使用 socket.end() 以關閉 socket 。
  另外， .end() 方法也可以加上一個 data 物件作為參數，所以您可以很簡單的這樣使用： socket.end(data) 。

  要閱讀 net 模組的文件，可以在瀏覽器中打開這個頁面：

  file:///Users/Roro/.nvm/versions/node/v8.4.0/lib/node_modules/learnyounode
  /node_apidoc/net.html

  您要從 new Date() 建立一個自定格式的日期。這個方法的使用方式如下：

     date.getFullYear()
     date.getMonth()     // starts at 0
     date.getDate()      // returns the day of month
     date.getHours()
     date.getMinutes()

  您如果想要再大膽一點，可以使用 npm 的 strftime 套件。這個 strftime(fmt,
  date) 函式使用的日期格式參數和 unix 系統的 date
  命令相同。您可以在這裡了解更多關於 strftime 套件的使用方法：
  (https://github.com/samsonjs/strftime)

*/

const net = require('net')
const portNumber = process.argv[2] || 8000

function zeroCheck(num){
  return num < 10 ? '0'+num : num
}

var date = new Date()
var month = zeroCheck(date.getMonth() +1)
var day = zeroCheck(date.getDate())
var hours = zeroCheck(date.getHours())
var mins = zeroCheck(date.getMinutes())

var whats_the_time = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + mins

var server = net.createServer(function(socket){
  socket.write(whats_the_time)
  socket.end('\n')
})
.on('error', (err) => {throw err})

server.listen(portNumber)

console.log(whats_the_time)
console.log('port: ' + portNumber)

/*
這裡是官方給的參考解答，以便你做參考比較：

─────────────────────────────────────────────────────────────────────────────

    var net = require('net')

    function zeroFill (i) {
      return (i < 10 ? '0' : '') + i
    }

    function now () {
      var d = new Date()
      return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
    }

    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })

    server.listen(Number(process.argv[2]))
*/