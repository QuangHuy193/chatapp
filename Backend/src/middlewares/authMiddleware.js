import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }

    // xác minh token hợp lệ
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "Token hết hạn hoặc không đúng" });
        }
        // tìm user
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword",
        );

        if (!user) {
          return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        if (!user.isActive) {
          return res.status(404).json({
            message: "Tài khoản không còn hoạt động",
          });
        }

        // trả user về req
        req.user = user;
        next();
      },
    );
  } catch (error) {
    console.error("Lỗi khi xác minh jwt trong middleware", error);
    return res.status(500).json({ mesage: "Lỗi hệ thống" });
  }
};

export const verifyResetToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Thiếu reset token" });
    }

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    if (decoded.type !== "RESET_PASSWORD") {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }

    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Token hết hạn hoặc không hợp lệ" });
  }
};
