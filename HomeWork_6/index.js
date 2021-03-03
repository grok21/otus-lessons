const httpServer = require('http').createServer(handler)
const io = require('socket.io')(httpServer)
const fs = require('fs')
const path = require('path')

function handler(req, res) {
  fs.readFile(path.join(__dirname, 'index.html'), 
  function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(data)
  })
}

io.on('connection', (socket) => {
  socket.emit('news', { greeting: "Hello socket.io"})
  socket.on('greeting', (data) => {
    console.log(data)
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))