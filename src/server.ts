const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
import { Response } from 'express'
import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import {
  PresentationEmitEventsMap,
  PresentationListenEventsMap,
  PresentationServerSocket,
  TransitionData,
} from './socketTypes'

app.use(cors())
app.use(express.static('dist'))

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

const listeners: PresentationServerSocket[] = []
const currentSlideData: TransitionData = { slide: 0, frame: 0 }

io.on('connection', (socket) => {
  socket.on('register', () => {
    listeners.push(socket)
    socket.emit('nextFrame', { caller: 'server', ...currentSlideData })
  })
  socket.on('nextFrame', (data) => {
    currentSlideData.slide = data.slide
    currentSlideData.frame = data.frame
    io.emit('nextFrame', { caller: socket.id, ...data })
  })
  socket.on('prevFrame', (data) => {
    currentSlideData.slide = data.slide
    currentSlideData.frame = data.frame
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
