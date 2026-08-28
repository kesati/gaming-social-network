const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Sai định dạng authorization" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token không khả dụng!" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decode.id);
        
        if(!user || user.status === "banned"){
            return res.status(401).json({ message: "User không tồn tại hoặc đã bị xóa!" });
        }

        req.user = decode;
        req.user.username = user.username;
        next();


    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Token không khả dụng!" });
    }
}


module.exports = authMiddleware;