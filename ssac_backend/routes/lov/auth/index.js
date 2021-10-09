var express = require("express");
const authController = require("../../../controllers/lov/auth/authController");
const authModule = require("../../../modules/authModule");
var router = express.Router();

// 로그인 유저 정보 받아오기(토큰 필요)
router.get("/profile", authModule.loggedIn, authController.readUser);
// 회원 정보 수정
router.put("/profile", authModule.loggedIn, authController.updateUser);
// 회원 삭제
router.delete("/profile", authModule.loggedIn, authController.deleteUser);

// 전체 유저 조회
router.get("/", authController.readAllUser);
// 회원가입
router.post("/signup", authController.signUpUser);
// 로그인
router.post("/signin", authController.signInUser);

module.exports = router;
