const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

const register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin đăng nhập!" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Định dạng Email không hợp lệ!" });
        }

        if (username.length < 6 || username.length > 30) {
            return res.status(400).json({ message: "Username phải từ 6-30 ký tự" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Mật khẩu ít nhất phải đủ 8 ký tự" });
        }

        const existingEmail = await User.findOne({
            where: { email },
        });

        if (existingEmail) {
            return res.status(409).json({ message: "Email đã tồn tại!" });
        }

        const existingUsername = await User.findOne({
            where: { username },
        });

        if (existingUsername) {
            return res.status(409).json({ message: "Username đã tồn tại!" })
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            password_hash,
        });

        return res.status(200).json({
            message: "Đăng ký thành công!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Lỗi server!" });
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "Sai email hoặc mật khẩu!" });
        }

        if (!(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: "Sai email hoặc mật khẩu!" });
        }

        if (user.status === "banned") {
            return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa!" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Đăng nhập thành công!",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });

    }
}


module.exports = {
    register, login
};