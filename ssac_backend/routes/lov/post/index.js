var express = require("express");
const postController = require("../../../controllers/lov/postControllers");

var router = express.Router();

router.post("/posts", postController.posts);

module.exports = router;
