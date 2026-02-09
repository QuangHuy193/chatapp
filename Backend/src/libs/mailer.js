import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "a1e5e0001@smtp-brevo.com",
    pass: process.env.BREVO_SMTP_API_KEY,
  },
});
