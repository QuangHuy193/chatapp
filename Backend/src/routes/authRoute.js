import express from "express";
import {
  signIn,
  signOut,
  signUp,
  refreshToken,
  createNewPass,
} from "../controllers/authController.js";
import { verifyResetToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/signout", signOut);

router.post("/refresh", refreshToken);

router.post("/createNewPass", verifyResetToken, createNewPass);

export default router;
