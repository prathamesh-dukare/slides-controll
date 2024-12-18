import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import roomRoutes from "./routes/roomRoutes";
import { initializeSocket } from "./socket/socketHandler";

const app = express();
const httpServer = createServer(app);

app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// initializing socket handler
initializeSocket(io);

const PORT = process.env.PORT || 3002;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
