const express = require("express");
const router = express.Router();
const authRouter = require("../lov/auth/index");
const postRouter = require("../lov/post/index");
const commentRouter = require("../lov/comment/index");
const searchRouter = require("./search/index");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/search", searchRouter);

module.exports = router;
