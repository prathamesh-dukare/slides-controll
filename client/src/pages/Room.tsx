import { Layout } from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";
import { SendCommand } from "../providers/SocketProvider";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { createRoom, connectToRoom, connectionStatus, socket, sendCommand } =
    useSocket();

  useEffect(() => {
    const initializeRoom = async () => {
      if (roomId) {
        connectToRoom(roomId, "host");
      } else {
        const newRoomId = await createRoom();
        if (newRoomId) {
          navigate(`/room/${newRoomId}`);
        }
      }
    };

    initializeRoom();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      return confirm("Are you sure? Your session will be lost if you refresh.");
    };
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          sendCommand(SendCommand.UP);
          break;
        case "ArrowDown":
          sendCommand(SendCommand.DOWN);
          break;
        case "ArrowLeft":
          sendCommand(SendCommand.LEFT);
          break;
        case "ArrowRight":
          sendCommand(SendCommand.RIGHT);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [sendCommand]);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-8">Room: {roomId}</h2>
        <p className="text-gray-600">{connectionStatus}</p>

        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-3 gap-4 w-48">
            <div className="col-start-2">
              <button
                onClick={() => sendCommand(SendCommand.UP)}
                className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="col-start-1 row-start-2">
              <button
                onClick={() => sendCommand(SendCommand.LEFT)}
                className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="col-start-3 row-start-2">
              <button
                onClick={() => sendCommand(SendCommand.RIGHT)}
                className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="col-start-2 row-start-3">
              <button
                onClick={() => sendCommand(SendCommand.DOWN)}
                className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
