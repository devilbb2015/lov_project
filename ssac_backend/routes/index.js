var express = require("express");
var router = express.Router();

const lovRouter = require("./lov/index");

router.use("/lov", lovRouter);

module.exports = router;
