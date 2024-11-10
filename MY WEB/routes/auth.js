const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra người dùng đã tồn tại chưa
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Người dùng đã tồn tại!" });

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({ email, password: hashedPassword });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Gửi phản hồi thành công
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Người dùng không tồn tại!" });

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Mật khẩu không đúng!" });

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });

    // Trả về token và thông báo đăng nhập thành công
    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
});

module.exports = router;
