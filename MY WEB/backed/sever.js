// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000; 
// Sử dụng cổng từ biến môi trường hoặc cổng mặc định 5000
// Nếu không xài được kiểm tra lại nó

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});
