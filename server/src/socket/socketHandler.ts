import { Server, Socket as SocketIOSocket } from 'socket.io'
import { rooms } from '../store/roomStore'

export const initializeSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Device connected:', socket.id)

    socket.on(
      'join-room',
      (data: { roomId: string; type: 'host' | 'client' }) => {
        const { roomId, type } = data
        const room = rooms.get(roomId)

        if (!room) {
          socket.emit('room-error', 'Session does not exist')
          return
        }

        if (type === 'host') {
          // todo: rethink if i should replace the host
          //   if (room.host) {
          //     socket.emit('room-error', 'Host already exists in this room')
          //     return
          //   }
          room.host = socket.id
          room.hostSocket = socket
          socket.emit('room-joined', { role: 'host' }) // notifying host

          if (room.clientSocket) {
            room.hostSocket.emit('client-connected')
          }
        } else {
          // todo: same as above
          //   if (room.client) {
          //     socket.emit('room-error', 'Client already exists in this room')
          //     return
          //   }

          room.client = socket.id
          room.clientSocket = socket
          socket.emit('room-joined', { role: 'client' }) // notifying client

          if (room.hostSocket) {
            room.hostSocket.emit('client-connected')
            socket.emit('host-connected')
          }
        }
      }
    )

    // relaying commands
    socket.on('send-command', (data: { roomId: string; command: string }) => {
      console.log(data, 'send-command received')

      const { roomId, command } = data
      const room = rooms.get(roomId)

      if (room) {
        if (socket.id === room.host) {
          room.clientSocket?.emit('device-command', command)
        } else if (socket.id === room.client) {
          room.hostSocket?.emit('device-command', command)
        }
      }
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
      for (const [roomId, room] of rooms.entries()) {
        // console.log('room data', room.host, room.client)
        if (room.host === socket.id) {
          if (room.clientSocket) {
            room.clientSocket.emit('host-disconnected')
          }
          room.host = undefined
          room.hostSocket = undefined
        } else if (room.client === socket.id) {
          if (room.hostSocket) {
            room.hostSocket.emit('client-disconnected')
          }
          room.client = undefined
          room.clientSocket = undefined
        }
      }
    })
  })
}
