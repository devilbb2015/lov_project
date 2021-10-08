var express = require("express");
const authController = require("../../../controllers/lov/authControllers");

var router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;
