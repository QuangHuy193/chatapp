import express from "express";
import {
  authMe,
  changePassword,
  deleteAccount,
  searchUserByUserName,
  updateInfo,
  updateRankType,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../middlewares/uploadImageMiddleware.js";

const router = express.Router();

router.get("/me", authMe);
router.get("/search", searchUserByUserName);

router.post("/uploadAvatar", upload.single("file"), uploadAvatar);

router.patch("/changePass", changePassword);
router.patch("/rankType", updateRankType);
router.patch("/info", updateInfo);

router.delete("/delete", deleteAccount);

export default router;
