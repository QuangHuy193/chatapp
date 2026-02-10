import express from "express";
import { getAllNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getAllNotification);

router.patch("/read/:notiId", getAllNotification);

export default router;
