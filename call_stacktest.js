// var EventEmitter = require('events');

// var crazy = new EventEmitter();

// crazy.on('event1', function () {
//   console.log('event1 fired!');
//   setImmediate(function () {
//     crazy.emit('event2');
//   });
// });

// crazy.on('event2', function () {
//   console.log('event2 fired!');
//   setImmediate(function () {
//     crazy.emit('event3');
//   });

// });

// crazy.on('event3', function () {
//   console.log('event3 fired!');
//   setImmediate(function () {
//     crazy.emit('event1');
//   });
// });

// crazy.emit('event1');

//如果我們把上面程式碼全部的 setImmediate()
//換成 process.nextTick 呢？你猜結果會怎樣？ (不要試！很恐怖！)
var EventEmitter = require('events');

var crazy = new EventEmitter();

crazy.on('event1', function () {
  console.log('event1 fired!');
  process.nextTick(function () {
    crazy.emit('event2');
  });
});

crazy.on('event2', function () {
  console.log('event2 fired!');
  process.nextTick(function () {
    crazy.emit('event3');
  });

});

crazy.on('event3', function () {
  console.log('event3 fired!');
  process.nextTick(function () {
    crazy.emit('event1');
  });
});

crazy.emit('event1');


////以下 stack 爆炸！
// var EventEmitter = require("events");

// var crazy = new EventEmitter();

// crazy.on('event1', function () {
//   console.log('event1 fired!');
//   crazy.emit('event2');
// });

// crazy.on('event2', function () {
//   console.log('event2 fired!');
//   crazy.emit('event3');

// });

// crazy.on('event3', function () {
//   console.log('event3 fired!');
//   crazy.emit('event1');
// });

// crazy.emit('event1');