import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";
import ms from "ms";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = "7d";

export const signUp = async (req, res) => {
  try {
    const { userName, password, email, firstName, lastName } = req.body;
    if (!userName || !email || !password || !firstName || !lastName) {
      res.status(400).json({
        message:
          "Không thể thiếu tên đăng nhập, mật khẩu, email, tên người dùng",
      });
    }

    // kiểm tra tồn tại
    const duplicate = await User.findOne({ userName });

    if (duplicate) {
      res.status(409).json({
        message: "Đã tồn tại tên đăng nhập này trong hệ thống",
      });
    }

    // mã hóa pass
    const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

    // tạo user mới
    await User.create({
      userName,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log(`Lỗi khi gọi signup`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(400).json({
        message: "Thiếu tên đăng nhập hoặc mật khẩu",
      });
    }

    // lấy hash pass trong db
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });
    }

    // kiểm tra pass
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });
    }

    // tạo access token với jwt
    const access_token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_TTL,
      },
    );

    // tao refresh token, luu vao db
    const refresh_token = crypto.randomBytes(64).toString("hex");

    await Session.create({
      userId: user._id,
      refreshToken: refresh_token,
      expiresAt: new Date(Date.now() + ms(REFRESH_TOKEN_TTL)),
    });

    // tra ve cookie
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // cho phep fe va be chay tren 2 domain khac nhau
      maxAge: ms(REFRESH_TOKEN_TTL),
    });

    return res.status(200).json({
      message: `Người dùng ${user.displayName} đã đăng nhập`,
      accessToken: access_token,
    });
  } catch (error) {
    console.log(`Lỗi khi gọi signin`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      // xóa trong Session db
      await Session.deleteOne({ refreshToken: token });

      // xóa trong cookie
      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(`Lỗi khi gọi signout`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

// tạo accessToken từ refreshToken
export const refreshToken = async (req, res) => {
  try {
    // lấy refreshToken từ cookie
    const  token  = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại" });
    }

    // so sánh với refreshToken trong db
    const session = await Session.findOne({ refreshToken: token });

    if (!session) {
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // kiểm tra thời hạn
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token đã hết hạn" });
    }

    // tạo accessToken mới
    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // trả về
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Lỗi khi gọi refreshToken", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
