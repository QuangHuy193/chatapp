export const authMe = async (req, res) => {
  try {
    const user = req.user; // từ middleware
    return res.status(200).json({ user });
  } catch (error) {
    console.log(`Lỗi khi gọi authme`, error);
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};
