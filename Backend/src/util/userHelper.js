import RankType from "../models/RankType.js";
import RankTypeLevel from "../models/RankTypeLevel.js";

// {
//   _id: new ObjectId('69847ac06f66fd2176f30aaf'),
//   userName: 'quanghuy193',
//   email: 'quanghuylhpq@gmail.com',
//   displayName: 'Quang Huy',
//   createdAt: 2026-02-05T11:10:56.951Z,
//   updatedAt: 2026-02-05T11:11:29.289Z,
//   __v: 0,
//   avatarId: 'mychat/avatars/xowbj621rklpqxmcsfgd',
//   avatarUrl: 'https://res.cloudinary.com/dak75cflv/image/upload/v1770289888/mychat/avatars/xowbj621rklpqxmcsfgd.jpg',
//   activePoint: 0,
//   rankTypeLevelId: 'mac-dinh-1',
//   rankTypeId: 'mac-dinh'
// }

export const mapUserWithRank = async (user) => {
  if (!user) return null;

  let rank = null;

  if (user.rankTypeId && user.rankTypeLevelId) {
    const [type, typeLevel] = await Promise.all([
      RankType.findById(user.rankTypeId).lean(),
      RankTypeLevel.findById(user.rankTypeLevelId).lean(),
    ]);

    if (type && typeLevel) {
      rank = {
        type: {
          _id: type._id,
          name: type.name,
        },
        level: {
          _id: typeLevel._id,
          level: typeLevel.level,
          label: typeLevel.label,
          minAP: typeLevel.minAP,
          maxAP: typeLevel.maxAP,
          uiCss: typeLevel.uiCss,
        },
      };
    }
  }

  return {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    activePoint: user.activePoint,
    phone: user.phone,
    bio: user.bio,
    rank,
  };
};

// const user = {
//             userId: p.userId?._id,
//             displayName: p.userId?.displayName,
//             avatarUrl: p.userId?.avatarUrl ?? null,
//             rankTypeId: p.userId?.rankTypeId ?? "",
//             rankTypeLevelId: p.userId?.rankTypeLevelId ?? "",
//             joinAt: p.joinAt,
//           };
export const mapUserInParticipantWithRank = async (user) => {
  if (!user) return null;

  let rank = null;

  if (user.rankTypeId && user.rankTypeLevelId) {
    const [type, typeLevel] = await Promise.all([
      RankType.findById(user.rankTypeId).lean(),
      RankTypeLevel.findById(user.rankTypeLevelId).lean(),
    ]);

    if (type && typeLevel) {
      rank = {
        type: {
          _id: type._id,
          name: type.name,
        },
        level: {
          _id: typeLevel._id,
          level: typeLevel.level,
          label: typeLevel.label,
          minAP: typeLevel.minAP,
          maxAP: typeLevel.maxAP,
          uiCss: typeLevel.uiCss,
        },
      };
    }
  }

  return {
    userId: user.userId,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl ?? null,
    joinAt: user.joinAt,
    rank,
  };
};
