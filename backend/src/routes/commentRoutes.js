const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { createComment, getComment, deleteComment } = require("../controllers/commentController.js");

const router = express.Router({ mergeParams: true });


router.post("/", authMiddleware, createComment);
router.get("/", getComment);
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
