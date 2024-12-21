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
  const [connectionMessage, setConnectionMessage] = useState("");
  const [areBothConnected, setAreBothConnected] = useState(false);

  const createRoom = async (): Promise<string | undefined> => {
    try {
      const response = await fetch(`${API_SERVER_URL}/create`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response was not JSON");
      }

      const data = await response.json();
      return data.roomId;
    } catch (error: unknown) {
      console.error("Error creating room:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setConnectionMessage(`Failed to create room: ${errorMessage}`);
      return undefined;
    }
  };

  const connectToRoom = (roomId: string, type: "host") => {
    if (!roomId) return;
    console.log("Connecting to room", roomId);

    // cleanup old
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(SOCKET_SIGNALING_SERVER_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      forceNew: true,
      timeout: 10000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setConnectionMessage(`Connection error: ${error.message}`);
    });

    setSocket(newSocket);
    setRoomId(roomId);

    const setupSocketListeners = (socket: Socket) => {
      socket.emit("join-room", { roomId, type });

      const events = [
        [
          "room-joined",
          (data: any) => {
            setConnectionMessage(`Joined as ${data.role}`);
          },
        ],
        [
          "client-connected",
          () => {
            setConnectionMessage("Client connected to the room");
            setAreBothConnected(true);
          },
        ],
        [
          "client-disconnected",
          () => {
            setConnectionMessage("Client disconnected from the room");
            setAreBothConnected(false);
          },
        ],
        [
          "room-error",
          (error: any) => {
            console.error("Session error:", error);
            setConnectionMessage(`Error: ${error}`);
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
    connectionMessage,
    createRoom,
    connectToRoom,
    sendCommand,
    areBothConnected,
  };

  return (
    <SocketContextProvider value={socketValue}>
      {children}
    </SocketContextProvider>
  );
}
