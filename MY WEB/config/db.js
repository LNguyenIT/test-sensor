// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sensordataapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
  } catch (error) {
    console.error("Kết nối thất bại:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
