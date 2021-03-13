/*
console.log("Service worker loaded")

const socket = io.connect('http://localhost:3000')

socket.on('news', (data) => {
  console.log(data)
  document.write(data.greeting)
  socket.emit('greeting', {response: "data received!"})
})
*/

/*
const socket = io.connect('http://localhost:3000')

    socket.on('news', (data) => {
      console.log(data)
      document.write(data.greeting)
      socket.emit('greeting', {response: "data received!"})
    })
    */

//const io = require("socket.io")
//const socket = io()


console.log("Service worker loaded")
const io = require('socket.io-client')


console.log("Service-worker loaded")

const socket = io.connect('http://localhost:3000')

socket.on('news', (data) => {
  console.log(data)
  alert("ABC")
  document.write(data.greeting)
  socket.emit('greeting', {response: "data received!"})
})
