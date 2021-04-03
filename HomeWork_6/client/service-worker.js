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









/*
let mainThread; 

self.addEventListener('message', async (event) => {
  console.log(event); 
  mainThread = await self.clients.matchAll()
  console.log(mainThread);
})
*/







/*
self.addEventListener('install', async (event) => {
  console.log(event); 
  mainThread = await self.clients.matchAll()
  console.log('mainThread1: ');
  console.log(mainThread);
  //mainThread.postMessage('ABC')
  
  self.clients.matchAll()
      .then((clients) => {
        //console.log(clients)
        mainThread = clients
        console.log('mainThread2: ');
        console.log(mainThread);
      })
      .catch((e) => console.log(e))
  
})
*/


//setInterval(mainThread.postMessage('ABC'), 4000)

//self.clients.matchAll().then((clients) => console.log(clients)).catch((e) => console.log(e))


/*
const io = require("socket.io-client")
const socket = io('http://localhost:3000', {
  jsonp: false
})
*/


/*
self.addEventListener('message', (event) => {
  console.log('123');
  console.log(event.data);
})
*/


//console.log(self.clients.matchAll().then((clients) => console.log(clients)).catch((e) => console.log(e)));


/*
self.addEventListener('message', (event) => {
  console.log(event);
  if (event.data && event.data.type === 'INCREASE_COUNT') {
    // Select who we want to respond to
    self.clients.matchAll({
      includeUncontrolled: true,
      type: 'window',
    }).then((clients) => {
      if (clients && clients.length) {
        // Send a response - the clients
        // array is ordered by last focused
        clients[0].postMessage({
          type: 'REPLY_COUNT',
          count: ++count,
        });
      }
    });
  }
});
*/