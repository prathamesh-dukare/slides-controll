import { Layout } from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { createRoom, connectToRoom, connectionStatus, socket } = useSocket();

  console.log(roomId, "in params");

  useEffect(() => {
    const initializeRoom = async () => {
      if (roomId) {
        connectToRoom(roomId, "host");
      } else {
        const newRoomId = await createRoom();
        if (newRoomId) {
          console.log("in if 2");
          navigate(`/room/${newRoomId}`);
        }
      }
    };

    initializeRoom();

    // Cleanup function
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-8">Room: {roomId}</h2>
        <p className="text-gray-600">{connectionStatus}</p>
      </div>
    </Layout>
  );
}
