const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { creatRoom, updateRoom } = require("../controllers/roomController.js");


const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, creatRoom);
router.get("/", getRooms);
router.patch("/:roomId", authMiddleware, updateRoom);

module.exports = router;