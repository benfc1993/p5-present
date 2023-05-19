import { io } from 'socket.io-client'
import { APP_TYPE } from '.'
export const socket = io('http://localhost:3001')

socket.on('connect', () => {
  socket.emit('register', { type: APP_TYPE })
})
