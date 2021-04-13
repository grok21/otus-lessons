const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer)

let notificationNumber = 1;

io.on('connection', (socket) => {
  function sendNotification() {
    socket.emit('serverNotification', { notificationNumber })
    notificationNumber++
  }

  setInterval(sendNotification, 4000)
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
