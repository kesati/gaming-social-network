const express = require("express");
const { getMyProfile, updateMyProfile } = require("../controllers/userProfileControllers.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", authMiddleware, getMyProfile);
router.put("/", authMiddleware, updateMyProfile);


module.exports = router;