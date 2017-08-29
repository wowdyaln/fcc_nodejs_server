// var myModule = require('./filter_module')


// var dir = process.argv[2];
// var ext = process.argv[3];

// myModule(dir, ext, function(err, data){
//   if (err) throw err;
//   console.log(data);
// })

//以下是 https://github.com/nodeschool/discussions/issues/64
// danielforsberg commented on 3 Jan 2015
var filter = require('./filter_module.js');
var dir = process.argv[2];
var ext = process.argv[3];

filter(dir, ext, function (err, filteredList) {

  for (var i = 0; i < filteredList.length; i++) {
    console.log(filteredList[i]);
  }

});

/*
//這裡是官方給的參考解答，以便你做參考比較：
─────────────────────────────────────────────────────────────────────────────
var filterFn = require('./solution_filter.js')
var dir = process.argv[2]
var filterStr = process.argv[3]

filterFn(dir, filterStr, function (err, list) {
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
})

*/
