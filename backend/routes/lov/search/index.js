var express = require("express");
const searchController = require("../../../controllers/lov/search/searchController");
var router = express.Router();

router.get("/", searchController.search);

module.exports = router;
