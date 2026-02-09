import OTP from "../models/OTP.js";
import User from "../models/User.js";
import { transporter } from "../libs/mailer.js";

export const sendMailForgotPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.sendStatus(400).json({ message: "" });
    }

    await OTP.deleteMany({ userId: user._id });

    // tạo OTP (6 số)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // hết hạn sau 5 phút
    await OTP.create({
      userId: user._id,
      otp,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    //  gửi mail
    await transporter.sendMail({
      from: '"MyChat" <quanghuylhpq@gmail.com>',
      to: email,
      subject: "Mã xác nhận đổi mật khẩu",
      html: `
        <h2>Xin chào ${user.userName}</h2>
        <h3>Mã xác nhận của bạn là:</h3>
        <h1 style="letter-spacing: 6px; color: #7c3aed; font-size: 36px; font-weight: bold;
        margin: 16px 0;">${otp}</h1>
        <div>Mã có hiệu lực trong <b>5 phút</b>.</div>        
      `,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("lỗi khi gửi mail quên mật khẩu", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const confirmForgotPass = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    if (!otp) {
      return res.status(400).json({ message: "Vui lòng nhập mã otp" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    const { otp: otpDB } = await OTP.findOne({ userId: user._id }).select(
      "otp",
    );

    if (!otp) {
      return res
        .status(400)
        .json({ message: "OTP không đúng hoặc đã hết hạn!" });
    }

    const isCompare = otp === otpDB;

    if (isCompare) {
      return res.sendStatus(204);
    } else {
      return res
        .status(400)
        .json({ message: "OTP không đúng hoặc đã hết hạn!" });
    }
  } catch (error) {
    console.error("lỗi khi xác nhận mã", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
