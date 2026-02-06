import express from "express";
import { getAllRankType } from "../controllers/rankTypeController.js";

const router = express.Router();

router.get("/rankType", getAllRankType);

export default router;
