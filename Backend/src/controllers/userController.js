import { uploadImageFromBuffer } from "../middlewares/uploadImageMiddleware.js";
import User from "../models/User.js";
import { mapUserWithRank } from "../util/userHelper.js";

export const authMe = async (req, res) => {
  try {
    const user = req.user; // từ middleware
    const userFormat = await mapUserWithRank(user);
   
    return res.status(200).json({ user: userFormat });
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

export const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;

    const userId = req.user._id;

    if (!file) {
      return res.status(404).json({ message: "Không tìm thấy file" });
    }

    const result = await uploadImageFromBuffer(file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: result.secure_url,
        avatarId: result.public_id,
      },
      {
        new: true,
      },
    ).select("avatarUrl");

    if (!updatedUser.avatarUrl) {
      return res.status(404).json({ message: "avatar trả về null" });
    }

    return res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.error(`Avatar upload failed`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};
