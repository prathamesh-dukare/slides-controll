import { Server, Socket as SocketIOSocket } from "socket.io";
import { rooms } from "../store/roomStore";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join room
    socket.on(
      "join-room",
      (data: { roomId: string; type: "host" | "client" }) => {
        console.log("join-room requested", data);

        const { roomId, type } = data;
        const room = rooms.get(roomId);

        if (!room) {
          socket.emit("room-error", "Room does not exist");
          return;
        }

        console.log("room", room);

        if (type === "host") {
          if (room.host) {
            socket.emit("room-error", "Host already exists in this room");
            return;
          }
          room.host = socket.id;
          room.hostSocket = socket;
          socket.emit("room-joined", { role: "host" });
        } else {
          if (room.client) {
            socket.emit("room-error", "Client already exists in this room");
            return;
          }
          room.client = socket.id;
          room.clientSocket = socket;
          socket.emit("room-joined", { role: "client" });

          // If both host and client are in the room, notify them
          if (room.hostSocket) {
            room.hostSocket.emit("client-connected");
            socket.emit("host-connected");
          }
        }
      }
    );

    // Relay commands
    socket.on("send-command", (data: { roomId: string; command: string }) => {
      console.log(data, "send-command received");

      setInterval(() => {
        const { roomId, command } = data;
        const room = rooms.get(roomId);

        if (room) {
          // Send to the other socket in the room
          if (socket.id === room.host) {
            room.clientSocket?.emit("device-command", command);
          } else if (socket.id === room.client) {
            room.hostSocket?.emit("device-command", command);
          }
        }
      }, 4000);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      // Find and clean up the room this socket was in
      for (const [roomId, room] of rooms.entries()) {
        if (room.host === socket.id) {
          room.host = undefined;
          room.hostSocket = undefined;
          rooms.delete(roomId);
        } else if (room.client === socket.id) {
          room.client = undefined;
          room.clientSocket = undefined;
        }
      }
    });
  });
};
