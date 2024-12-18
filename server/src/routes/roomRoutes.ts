import express from "express";
import { createRoom } from "../roomController";

const router = express.Router();

router.get("/create", createRoom);

export default router;
