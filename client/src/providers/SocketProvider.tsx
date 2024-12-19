import { useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { SocketProvider as SocketContextProvider } from "../context/SocketContext";

const SOCKET_SIGNALING_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const API_SERVER_URL = `${SOCKET_SIGNALING_SERVER_URL}/api/v1/room`;

interface SocketProviderProps {
  children: ReactNode;
}

export enum SendCommand {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  const createRoom = async (): Promise<string | undefined> => {
    try {
      const response = await fetch(`${API_SERVER_URL}/create`);
      const data = await response.json();
      return data.roomId;
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  const connectToRoom = (roomId: string, type: "host") => {
    if (!roomId) return;
    console.log("Connecting to room", roomId);

    // cleanup old
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(SOCKET_SIGNALING_SERVER_URL);
    setSocket(newSocket);
    setRoomId(roomId);

    const setupSocketListeners = (socket: Socket) => {
      socket.emit("join-room", { roomId, type });

      const events = [
        [
          "room-joined",
          (data: any) => {
            setConnectionStatus(`Joined as ${data.role}`);
          },
        ],
        [
          "client-connected",
          () => {
            setConnectionStatus("Client connected to the room");
          },
        ],
        [
          "room-error",
          (error: any) => {
            console.error("Room error:", error);
            setConnectionStatus(`Error: ${error}`);
          },
        ],
      ] as const;

      events.forEach(([event, handler]) => {
        socket.on(event, handler);
      });

      return () => {
        events.forEach(([event, handler]) => {
          socket.off(event, handler);
        });
      };
    };

    const cleanup = setupSocketListeners(newSocket);

    // combined cleanup
    return () => {
      cleanup();
      newSocket.disconnect();
    };
  };

  const sendCommand = (command: SendCommand) => {
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
