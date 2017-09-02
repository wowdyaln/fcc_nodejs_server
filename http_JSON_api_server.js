/*
## HTTP JSON API 伺服器 (練習題 13 之 13)

  撰寫一個 HTTP 伺服器 ，當伺服器收到路徑「/api/parsetime」的 GET
  請求時，要回應 JSON 格式的資料。這個請求會包含一個 query ， key
  是「iso」，值是 ISO 格式的時間。

  如下例：

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  回應的 JSON
  應該只包含三個屬性：「hour」、「minute」及「second」。舉例來說：

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  您還要加入第二個可以接受相同 query ，但這次在「unixtime」屬性下回應 UNIX
  時間格式（又稱為 epoch 或 POSIX 時間格式）的路徑「/api/unixtime」。

     { "unixtime": 1376136615474 }

  您的伺服器應該持續監聽在第一個參數提供的 port 上。

 ─────────────────────────────────────────────────────────────────────────────

 ## 提示

  來自 HTTP 伺服器的 request 物件會擁有一個 url
  屬性，您可以使用這個屬性判斷請求究竟是針對哪個路徑。

  您可以使用 Node 核心模組 url 來解析 query 和網址。 
  url.parse(request.url, true) 會解析 request.url 的內容，並提供您一個擁有好用屬性的物件。

  舉例來說，在命令列中輸入：

     $ node -pe "require('url').parse('/test?q=1', true)"
會得到：
     Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?q=1',
  query: { q: '1' },
  pathname: '/test',
  path: '/test?q=1',
  href: '/test?q=1' }

  要閱讀 url 模組的文件，可以在瀏覽器中打開這個頁面：

  Documentation on the url module can be found by pointing your browser
  here:
  file:///Users/Roro/.nvm/versions/node/v8.4.0/lib/node_modules/learnyounode
  /node_apidoc/url.html

  您的回應應該是 JSON 格式。要了解更多資訊，可以參考 JSON.stringify() 。

  您也應該做個網路上的好公民，回應 Content-Type 屬性：

     res.writeHead(200, { 'Content-Type': 'application/json' })

  Javascript 的 Date 物件可以用 ISO 格式顯示日期，
  如 new Date().toISOString() 。
  如果您把日期字串傳入 Date 物件，這個物件也可以用來解析時間格式。
  Date.getTime() 也可以派上用場。

*/
const url = require('url')
const http = require('http')
const port = process.argv[2]

var server = http.createServer(function(req, response){
  var reqUrl = url.parse(req.url, true)
  // var timeString = reqUrl.search.slice(5)
  var timeString = reqUrl.query.iso
  if (req.method !== 'GET') {
    return response.end('send me a GET\n')
  }
  
  if (reqUrl.pathname == '/api/parsetime' ){
    response.writeHead(200, { 'Content-Type': 'application/json'})

    let json = JSON.stringify(
      {
        "hour": new Date(timeString).getHours(),
        "minute": new Date(timeString).getMinutes(),
        "second": new Date(timeString).getSeconds()
      }
    )
    console.log(json)
    response.end(json)
  }

  if (reqUrl.pathname == '/api/unixtime' ){
    response.writeHead(200, { 'Content-Type': 'application/json'})

    var isotime = Date.parse(timeString)
    var json = JSON.stringify({
      "unixtime": isotime
    })
    response.end(json)
  }

})

server.listen(port)

/*
這裡是官方給的參考解答，以便你做參考比較：

─────────────────────────────────────────────────────────────────────────────

    var http = require('http')
    var url = require('url')

    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }

    function unixtime (time) {
      return { unixtime: time.getTime() }
    }

    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result

      if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
      } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
      }

      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))
*/