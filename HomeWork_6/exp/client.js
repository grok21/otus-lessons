console.log(1 + " AAAA")



if ('serviceWorker' in navigator) {
  registerSW().catch(err => console.log(err))
}

async function registerSW() {
  console.log("Register service worker")
  const register = await navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
  })
  console.log("SW registered")
}



/*
const socket = io.connect('http://localhost:3000')

socket.on('news', (data) => {
  console.log(data)
  document.write(data.greeting)
  socket.emit('greeting', {response: "data received!"})
 })
*/



