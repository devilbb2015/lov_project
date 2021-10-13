var express = require("express");
var router = express.Router();

const authRouter = require("./auth/index");
const postRouter = require("./post/index");
const commentRouter = require("./comment/index");
const searchRouter = require("./search/index");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/search", searchRouter);

module.exports = router;
