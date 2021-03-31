require('regenerator-runtime/runtime')

async function registerSW() {
  console.log("Register service worker")
  const register = await navigator.serviceWorker.register('./service-worker.js', {
    scope: '/'
  }).catch(e => console.log(e))
  console.log("SW registered")
}

if ('serviceWorker' in navigator) {
  registerSW().catch(err => console.log(err))
}


/*
const io = require("socket.io-client")
const socket = io()

socket.on('message', message => {
  console.log(message)
})
*/


























