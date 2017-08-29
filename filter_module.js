// var fs = require('fs');
// var path = require('path');


// module.exports = function (dir, ext, callback){
//   fs.readdir(dir, function(err, files){
//     if (err){
//       return callback(err);
//     }
//     files.forEach(function(file){
//       if (path.extname(file) === '.' + ext){
//         callback(null, file) //重點錯在這邊
//       }
//     })
//   })
// }

//以下是 https://github.com/nodeschool/discussions/issues/64
// danielforsberg commented on 3 Jan 2015
module.exports = function (dir, ext, callback) {

  var fs = require('fs');

  fs.readdir(dir, function (err, list) {

    if (err) {

      return callback(err);

    } else {

      var filteredList = list.filter(sort);

      function sort(value) {
        if (value.indexOf('.' + ext) >= 0) {
          return value
        }
      }

    }

    callback(null, filteredList);
  });

};

/*
這裡是官方給的參考解答，以便你做參考比較：
─────────────────────────────────────────────────────────────────────────────
var fs = require('fs')
var path = require('path')

module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}

*/