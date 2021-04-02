/*
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
*/

//app.use(express.static(path.join(__dirname, 'client')))

/*
io.on('connection', socket => {
  console.log('New connection...')
  socket.emit('message', 'Welcome to chat')
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
*/


const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer)

io.on('connection', (socket) => {
  socket.emit('news', { greeting: "Hello socket.io"})
  socket.on('greeting', (data) => {
    console.log(data)
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
