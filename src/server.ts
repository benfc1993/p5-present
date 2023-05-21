const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
import { Response } from 'express'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

app.use(cors())
// app.use(express.static('dist/aud'))
// app.use(express.static('dist/pres'))
app.use(express.static('dist'))

type TransitionData = { slide: number; frame: number }

interface PresentationListenEventsMap {
  register: () => void
  nextFrame: (data: TransitionData) => void
  prevFrame: (data: TransitionData) => void
}

interface PresentationEmitEventsMap {
  register: () => void
  nextFrame: (data: TransitionData & { caller: string }) => void
  prevFrame: (data: TransitionData & { caller: string }) => void
}

type PresentationSocket = Socket<
  PresentationListenEventsMap,
  PresentationEmitEventsMap,
  DefaultEventsMap,
  any
>

const io = new Server<
  PresentationListenEventsMap,
  PresentationEmitEventsMap,
  DefaultEventsMap,
  any
>(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

const listeners: PresentationSocket[] = []

io.on('connection', (socket) => {
  socket.on('register', () => {
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

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html')
})
app.get('/presenter', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(3000, () => {
  console.log('Presentation is on: http://localhost:3000')
  console.log('Presenter mode is on: http://localhost:3000/presenter')
})
