import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./libs/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import friendRoute from "./routes/friendRoute.js";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3456;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// swagger api
//*******************
// const swaggerDocument = JSON.parse(
//   fs.readFileSync("./src/swagger.json", "utf8"),
// );
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// public router
app.use(`/api/auth`, authRoute);

// private router
app.use(protectedRoute);
app.use(`/api/users`, userRoute);
app.use(`/api/friends`, friendRoute);
app.use(`/api/messages`, messageRoute);
app.use(`/api/conversations`, conversationRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server đang chạy tại cổng ${PORT}`);
  });
});
