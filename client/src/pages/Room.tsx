import { Layout } from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";
import { SendCommand } from "../providers/SocketProvider";
// import { ControllerCombobox, controllerTypes } from "../components/ComboBox";
// import CarouselComponent from "../components/CarouselBox";
export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { createRoom, connectToRoom, connectionStatus, socket, sendCommand } =
    useSocket();

  // const [controllerType, setControllerType] = useState(
  //   controllerTypes[0].value
  // );

  const [copied, setCopied] = useState(false);

  const copyRoomId = async () => {
    if (!roomId) return;
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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
    if (import.meta.env.VITE_ENV === "development") {
      return;
    }

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
      <div className="flex flex-col gap-12 items-center">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-0">
            <div className="flex items-center gap-3 rounded-md px-4 py-2">
              <h2 className="text-2xl font-semibold">Session ID: {roomId}</h2>
              <button
                onClick={copyRoomId}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                title="Copy room ID"
              >
                {copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-gray-600 mt-2">{connectionStatus}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* TODO: Add controller */}
          {/* <ControllerCombobox
            value={controllerType}
            onChange={setControllerType}
          /> */}

          <div className="grid grid-cols-3 gap-4 w-48 justify-center mt-10">
            <div className="col-start-2">
              <button
                onClick={() => sendCommand(SendCommand.UP)}
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
