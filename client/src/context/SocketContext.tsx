import { createContext, useContext, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { SendCommand } from "../providers/SocketProvider";

interface SocketContextType {
  socket: Socket | null;
  roomId: string;
  connectionStatus: string;
  createRoom: () => Promise<string | undefined>;
  connectToRoom: (roomId: string, type: "host") => (() => void) | undefined;
  sendCommand: (command: SendCommand) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

interface SocketProviderProps {
  children: ReactNode;
  value: SocketContextType;
}

export function SocketProvider({ children, value }: SocketProviderProps) {
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
