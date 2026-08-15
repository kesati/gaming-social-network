const express = require("express");
const { toggleReaction, getReactionsByPost } = require("../controllers/reactionController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");


const router = express.Router({ mergeParams: true });


router.post("/reactions", authMiddleware, toggleReaction);
router.get("/reactions", authMiddleware, getReactionsByPost);

module.exports = router;