import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequset.js";
import { swapFriend } from "../util/friendHelper.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { to, message } = req.body;
    const from = req.user._id;

    if (from.toString() === to.toString()) {
      return res
        .status(400)
        .json({ message: "Không thể gửi lời mời kết bạn cho chính mình" });
    }

    const userExists = await User.exists({ _id: to });
    if (!userExists) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    let userA = from.toString();
    let userB = to.toString();   

    // chạy song song 2 request
    const [alreadyFriends, existingRequest] = await Promise.all([
      Friend.findOne({
        $or: [
          { userA, userB },
          { userB: userA, userA: userB },
        ],
      }),
      FriendRequest.findOne({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }),
    ]);

    if (alreadyFriends) {
      return res.status(400).json({ message: "2 người đã là bạn bè" });
    }
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Đã có lời mời kết bạn dang chờ" });
    }

    const request = await FriendRequest.create({
      from: userA,
      to: userB,
      message,
    });
    console.log("đã tạo");
    return res
      .status(201)
      .json({ messgae: "Gửi lời mời kết bạn thành công", request });
  } catch (error) {
    console.error("lỗi khi gửi yêu cầu kết bạn", error);
    return res.status(500).json({ message: "lỗi hệ thống" });
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

    const [userA, userB] = swapFriend(request.from, request.to);
    await Friend.create({
      userA,
      userB,
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
    console.error("lỗi khi chấp nhận yêu cầu kết bạn", error);
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
    console.error("lỗi khi từ chối yêu cầu kết bạn", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const friendShips = await Friend.find({
      $or: [
        {
          userA: userId,
        },
        {
          userB: userId,
        },
      ],
    })
      .populate("userA", "_id userName displayName avatarUrl")
      .populate("userB", "_id userName displayName avatarUrl")
      .lean();

    if (friendShips.length === 0) {
      return res.status(200).json({ friends: [] });
    }

    const friends = friendShips.map((fs) =>
      fs.userA._id.toString() === userId.toString() ? fs.userB : fs.userA,
    );

    return res.status(200).json({ friends });
  } catch (error) {
    console.error("lỗi khi lấy danh sách bạn bè", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const populateFields = "_id userName displayName avatarUrl";

    const [send, received] = await Promise.all([
      FriendRequest.find({ from: userId }).populate("from", populateFields),
      FriendRequest.find({ to: userId }).populate("to", populateFields),
    ]);

    return res.status(200).json({ send, received });
  } catch (error) {
    console.error("lỗi khi lấy danh sách yêu cầu kết bạn", error);
    return res.status(500).json({ messgae: "lỗi hệ thống" });
  }
};
