
var fs = require('fs');

fs.readFile(process.argv[2], function err(err, data){
  if (err = false) {
    console.log(err);
  }
  var str = data.toString();

  var line = str.split('\n').length - 1;

  console.log(line);
});

/*
這裡是官方給的參考解答，以便你做參考比較：

─────────────────────────────────────────────────────────────────────────────

    var fs = require('fs')
    var file = process.argv[2]

    fs.readFile(file, function (err, contents) {
      if (err) {
        return console.log(err)
      }
      // 你也可以使用 fs.readFile(file, 'utf8', callback)
      var lines = contents.toString().split('\n').length - 1
      console.log(lines)
    })

*/
