import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized - token không tồn tại"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return next(
        new Error("Unauthorized - token không hợp lệ hoặc đã hết hạn"),
      );
    }

    const user = await User.findById(decoded.userId).select("-hashPassword");

    if (!user) {
      return next(new Error("Người dùng không tồn tại"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("Lỗi xảy ra khi kiểm tra token trong socket", error);
    next(new Error("Unthorized"));
  }
};
