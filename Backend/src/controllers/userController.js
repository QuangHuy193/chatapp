import { uploadImageFromBuffer } from "../middlewares/uploadImageMiddleware.js";
import RankType from "../models/RankType.js";
import RankTypeLevel from "../models/RankTypeLevel.js";
import User from "../models/User.js";
import { mapUserWithRank } from "../util/userHelper.js";
import bcrypt from "bcrypt";

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
      isActive: true,
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

export const updateRankType = async (req, res) => {
  try {
    const { rankType } = req.body;
    const userId = req.user._id;

    if (!rankType) {
      return res.status(404).json({ message: "Không tìm thấy loại rank mới" });
    }

    const { name } = await RankType.findById(rankType);

    const { rankTypeLevelId } =
      await User.findById(userId).select("rankTypeLevelId");

    const rankTypeLevel = await RankTypeLevel.findById(rankTypeLevelId);

    const rankTypeLevelNew = await RankTypeLevel.findOne({
      level: rankTypeLevel.level,
      rankTypeId: rankType,
    });

    await User.findByIdAndUpdate(userId, {
      rankTypeId: rankType,
      rankTypeLevelId: rankTypeLevelNew._id,
    });

    const { rankTypeId, ...rankTypeLevelClean } = rankTypeLevelNew.toObject();
    res.status(200).json({
      rank: {
        type: {
          _id: rankType,
          name,
        },
        level: rankTypeLevelClean,
      },
    });
  } catch (error) {
    console.error(`Đổi loại rank failed`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

export const updateInfo = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ["userName", "displayName", "email", "phone", "bio"];
    const user = req.user;

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Không có thông tin nào để cập nhật!",
      });
    }

    const userUpdated = await User.findByIdAndUpdate(
      user._id,
      { $set: updates },
      {
        new: true,
      },
    );

    const userUpdatedFormat = await mapUserWithRank(userUpdated);

    return res.status(200).json({
      user: userUpdatedFormat,
    });
  } catch (error) {
    console.error(`Cập nhật thông tin thất bại`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPass, newPass } = req.body;

    const userId = req.user._id;

    const { hashedPassword: hashedPasswordOld } =
      await User.findById(userId).select("hashedPassword");

    const passwordCorrect = await bcrypt.compare(oldPass, hashedPasswordOld);

    if (!passwordCorrect) {
      return res.status(400).json({
        message: "Mật khẩu cũ không đúng!",
      });
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);

    await User.findByIdAndUpdate(userId, {
      hashedPassword,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Thay đổi mật khẩu thất bại`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;

    if (!user.isActive) {
      return res.status(400).json({
        message: "Tài khoản đã ngừng hoạt động trước đó!",
      });
    }

    await User.findByIdAndUpdate(user._id, {
      isActive: false,
    });

    return res.sendStatus(204)
  } catch (error) {
    console.error(`Xóa tài khoản thất bại`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};
