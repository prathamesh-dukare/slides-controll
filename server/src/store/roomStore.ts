import { Socket as SocketIOSocket } from 'socket.io'

interface Room {
  host?: string
  client?: string
  hostSocket?: SocketIOSocket
  clientSocket?: SocketIOSocket
}

export const rooms = new Map<string, Room>()
