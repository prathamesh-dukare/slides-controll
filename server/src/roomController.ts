import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { rooms } from "./store/roomStore";

export const createRoom = (req: Request, res: Response) => {
  console.log("create-room requested");
  const roomId = uuidv4().slice(0, 6).toUpperCase();
  rooms.set(roomId, {});
  res.json({ roomId });
};
