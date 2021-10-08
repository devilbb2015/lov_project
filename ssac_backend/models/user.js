const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  nickName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: null }, // 타입
  age: { type: Number, default: null }, // 나이
  gender: { type: String, enum: ["male", "female"], default: "male" }, // 성별
  degree: { type: Number, default: "0" }, // 온도
  inoDate: { type: Date, default: null }, // 백신일
  verified: { type: Boolean, default: "false" }, // 추가정보 입력 유무
  profileImage: { type: String, default: null }, // 프로필 이미지
});

module.exports = mongoose.model("user", userSchema);
