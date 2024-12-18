import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SIGNALING_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const API_SERVER_URL = `${SOCKET_SIGNALING_SERVER_URL}/api/v1/room`;

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");

  // Create room
  const createRoom = async () => {
    try {
      const response = await fetch(`${API_SERVER_URL}/create`);
      const data = await response.json();
      setRoomId(data.roomId);

      // Connect to socket and join as host
      const newSocket = io(SOCKET_SIGNALING_SERVER_URL);
      setSocket(newSocket);

      newSocket.emit("join-room", {
        roomId: data.roomId,
        type: "host",
      });

      newSocket.on("room-joined", (data) => {
        setConnectionStatus(`Joined as ${data.role}. Room ID: ${roomId}`);
      });

      newSocket.on("client-connected", () => {
        setConnectionStatus("Client connected to the room");
      });
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  // Join room
  const joinRoom = () => {
    if (!roomId) return;

    const newSocket = io(SOCKET_SIGNALING_SERVER_URL);
    setSocket(newSocket);

    newSocket.emit("join-room", {
      roomId,
      type: "client",
    });

    newSocket.on("room-joined", (data) => {
      setConnectionStatus(`Joined as ${data.role}. Room ID: ${roomId}`);
    });

    newSocket.on("host-connected", () => {
      setConnectionStatus("Host connected to the room");
    });
  };

  // Send command
  const sendCommand = (command: string) => {
    if (socket && roomId) {
      socket.emit("send-command", { roomId, command });
    }
  };

  useEffect(() => {
    console.log(SOCKET_SIGNALING_SERVER_URL);
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={createRoom}>Create Room</button>
        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div>
        <p>Status: {connectionStatus}</p>
      </div>

      <div>
        <button onClick={() => sendCommand("left")}>Left</button>
        <button onClick={() => sendCommand("right")}>Right</button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Slide Control</h1>

      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Room ID"
            className="flex-1 rounded-md border p-2"
          />
          <button className="btn">Create Room</button>
          <button className="btn">Join Room</button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Status:</h2>
          <div className="flex gap-4">
            <button>Left</button>
            <button>Right</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
