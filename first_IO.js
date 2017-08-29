var fs = require('fs');

var buffer = fs.readFileSync(process.argv[2]);

var str = buffer.toString();

var line = str.split('\n').length - 1;

console.log(line);

/*
這裡是官方給的參考解答，以便你做參考比較：

─────────────────────────────────────────────────────────────────────────────

    var fs = require('fs')

    var contents = fs.readFileSync(process.argv[2])
    var lines = contents.toString().split('\n').length - 1
    console.log(lines)

    // 提醒你可以省去使用 .toString() ，只要把'utf8'作為
    // readFileSync 的第二個輸入參數，便可輸出成字串
    //
    // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

*/