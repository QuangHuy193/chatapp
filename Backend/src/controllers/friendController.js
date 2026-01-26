import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequset.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { to, message } = req.body;

    const from = req.user._id;

    if (from === to) {
      return res
        .status(400)
        .json({ messgae: "Không thể gửi lời mời kết bạn cho chính mình" });
    }

    const userExists = await User.exists({ _id: to });
    if (!userExists) {
      return res.status(400).json({ messgae: "Người dùng không tồn tại" });
    }

    let userA = from.toString();
    let userB = from.toString();
    if (userA > userB) {
      [userA, userB] = [userB, userA];
    }

    // chạy song song 2 request
    const [alreadyFriends, existingRequest] = await Promise.all([
      Friend.findOne({ userA, userB }),
      FriendRequest.findOne({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }),
    ]);

    if (alreadyFriends) {
      return res.status(400).json({ messgae: "2 người đã là bạn bè" });
    }
    if (existingRequest) {
      return res
        .status(400)
        .json({ messgae: "Đã có lời mời kết bạn dang chờ" });
    }

    const request = await FriendRequest.create({ from, to, message });
    return res
      .status(201)
      .json({ messgae: "Gửi lời mời kết bạn thành công", request });
  } catch (error) {
    console.log("lỗi khi gửi yêu cầu kết bạn", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ messgae: "Không tìm thấy lời mời kết bạn" });
    }

    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ messgae: "Bạn không có quyền chấp nhận lời mời này" });
    }

    await Friend.create({
      userA: request.from ,
      userB: request.to,
    });

    await FriendRequest.findByIdAndDelete(requestId);

    const from = await User.findById(request.from)
      .select("_id displayName avatarUrl")
      .lean();

    return res.status(200).json({
      messgae: "Chấp nhận lời mời kết bạn thành công",
      newFriend: {
        ...from,
      },
    });
  } catch (error) {
    console.log("lỗi khi chấp nhận yêu cầu kết bạn", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ messgae: "Không tìm thấy lời mời kết bạn" });
    }

    if (request.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ messgae: "Bạn không có quyền từ chối lời mời này" });
    }

    await FriendRequest.findByIdAndDelete(requestId);

    return res.status(204);
  } catch (error) {
    console.log("lỗi khi từ chối yêu cầu kết bạn", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};

export const getAllFriends = async (req, res) => {
  try {
  } catch (error) {
    console.log("lỗi khi lấy danh sách bạn bè", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
  } catch (error) {
    console.log("lỗi khi lấy danh sách yêu cầu kết bạn", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};
