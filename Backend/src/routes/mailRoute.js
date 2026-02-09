import express from "express";
import { confirmForgotPass, sendMailForgotPass } from "../controllers/mailController.js";


const router = express.Router()

router.post("/forgotPass", sendMailForgotPass)
router.post("/confirmPass", confirmForgotPass)

export default router