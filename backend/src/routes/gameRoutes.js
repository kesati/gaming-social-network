const express = require("express");
const { getAllGame, creatGame } = require("../controllers/gameController.js");

const router = express.Router();

router.get("/", getAllGame);

module.exports = router;