import express from "express";
import {
  authMe,
  searchUserByUserName,
  updateRankType,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../middlewares/uploadImageMiddleware.js";

const router = express.Router();

router.get("/me", authMe);
router.get("/search", searchUserByUserName);

router.post("/uploadAvatar", upload.single("file"), uploadAvatar);

router.patch("/rankType", updateRankType);

export default router;
