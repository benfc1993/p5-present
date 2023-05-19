const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

app.use(cors())
// app.use(express.static('dist/aud'))
// app.use(express.static('dist/pres'))
app.use(express.static('dist'))

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

const listeners = []

io.on('connection', (socket) => {
  socket.on('register', (data) => {
    listeners.push(socket)
  })
  socket.on('nextFrame', (data) => {
    io.emit('nextFrame', { caller: socket.id, ...data })
  })
  socket.on('prevFrame', (data) => {
    io.emit('prevFrame', { caller: socket.id, ...data })
  })
})

io.listen(3001)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})
app.get('/presenter', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
