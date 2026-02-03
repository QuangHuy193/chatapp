import User from "../models/User.js";

export const authMe = async (req, res) => {
  try {
    const user = req.user; // từ middleware
    return res.status(200).json({ user });
  } catch (error) {
    console.error(`Lỗi khi gọi authme`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

export const searchUserByUserName = async (req, res) => {
  try {
    const { userName } = req.query;

    if (!userName || userName.toString().trim() === "") {
      return res.status(404).json({ message: "Không có user trong query" });
    }

    const user = await User.findOne({
      userName,
    }).select("_id userName displayName avatarUrl");

    return res.status(200).json({ user });
  } catch (error) {
    console.error(`Lỗi khi gọi searchUserByUserName`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};
