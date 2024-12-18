import { useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { SocketProvider as SocketContextProvider } from "../context/SocketContext";

const SOCKET_SIGNALING_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const API_SERVER_URL = `${SOCKET_SIGNALING_SERVER_URL}/api/v1/room`;

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  // Create room - only generates room ID
  const createRoom = async (): Promise<string | undefined> => {
    try {
      const response = await fetch(`${API_SERVER_URL}/create`);
      const data = await response.json();
      return data.roomId;
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  // Connect to room
  const connectToRoom = (roomId: string, type: "host") => {
    if (!roomId) return;
    console.log("Connecting to room", roomId);

    // Cleanup previous socket connection if exists
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(SOCKET_SIGNALING_SERVER_URL);
    setSocket(newSocket);
    setRoomId(roomId);

    // Setup event listeners
    const setupSocketListeners = (socket: Socket) => {
      socket.emit("join-room", { roomId, type });

      socket.on("room-joined", (data) => {
        setConnectionStatus(`Joined as ${data.role}. Room ID: ${roomId}`);
      });

      socket.on("client-connected", () => {
        setConnectionStatus("Client connected to the room");
      });
    };

    setupSocketListeners(newSocket);

    // Return cleanup function
    return () => {
      newSocket.disconnect();
    };
  };

  // Send command
  const sendCommand = (command: string) => {
    if (socket && roomId) {
      socket.emit("send-command", { roomId, command });
    }
  };

  const socketValue = {
    socket,
    roomId,
    connectionStatus,
    createRoom,
    connectToRoom,
    sendCommand,
  };

  return (
    <SocketContextProvider value={socketValue}>
      {children}
    </SocketContextProvider>
  );
}
