const express = require("express");
const authMiddlewar = require("../middlewares/authMiddleware.js");

const route = express.Router();

route.get("/profile", authMiddlewar, (req, res) => {
    res.status(200).json({
        message: "Bạn đã xác thực thành công",
        user: req.user
    });
});

module.exports = route;