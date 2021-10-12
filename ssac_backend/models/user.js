const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// Pre - 몽구스의 middleware기능이다
// - init, validate, save, remove 메소드 수행시 처리되는 미들웨어 펑션이다
// - 복잡한 유효성검사, 트리거 이벤트 처리, 에러 핸들링등. 예로 사용자를 삭제하면 사용자 관련 블로그포스트도 삭제하기같은 경우 사용

// 비밀번호 암호화
userSchema.pre("save", function (next) {
  // this -> userSchemaa
  const user = this;
  // 비밀번호를 바꿀 때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // password를 hash암호로 교체
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 암호화 비밀번호 유효성 체크
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword를 암호화 후 db와 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, isMatch);
    }
  });
};

module.exports = mongoose.model("user", userSchema);
