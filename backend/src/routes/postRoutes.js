const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts } = require("../controllers/postController.js");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/search", searchPosts);
router.get("/:postId", authMiddleware, getPostById);
router.patch("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;