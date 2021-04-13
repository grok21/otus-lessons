require('regenerator-runtime/runtime')
const io = require("socket.io-client");

console.log("Service worker")

const channel = new BroadcastChannel('sw');
const socket = io('http://localhost:3000', {
  jsonp: false
});

socket.on('serverNotification', (data) => {
  console.log('in SW: ' + data)
  channel.postMessage({
    msg: data 
  })
})
