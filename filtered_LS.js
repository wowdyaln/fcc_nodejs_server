var fs = require('fs');
var path = require('path');

var p = process.argv[2];
var keyword = process.argv[3];

fs.readdir(p, function(err, files){
  if (err){
    console.log(err);
  }

  files.forEach(function(ele){
    if (path.extname(ele) == '.' + keyword){
      console.log(ele);
    }
  })
})



/*
這裡是官方給的參考解答，以便你做參考比較：

─────────────────────────────────────────────────────────────────────────────

    var fs = require('fs')
    var path = require('path')

    var folder = process.argv[2]
    var ext = '.' + process.argv[3]

    fs.readdir(folder, function (err, files) {
      if (err) return console.error(err)
      files.forEach(function (file) {
        if (path.extname(file) === ext) {
          console.log(file)
        }
      })
    })

*/
