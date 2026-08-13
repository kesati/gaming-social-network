const UserProfile = require("../models/UserProfile.js");

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile =  await UserProfile.findOne({
            where: { user_id: userId }
        });

        if(!profile) {
            return res.status(404).json({ message: "Người dùng không tồn tại!"});
        }

        return res.status.json({ 
            message: "Lấy profile thành công!",
            profile
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            avatar_url,
            bio,
            favorite_game,
            main_rank,
            play_time,
            preferred_role
        } = req.body;


        const [profile] = await UserProfile.upsert({
            user_id: userId,
            avatar_url,
            bio,
            favorite_game,
            main_rank,
            play_time,
            preferred_role
        });


        return res.status(200).json({
            message: "Cập nhật profile thành công",
            profile
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

module.exports = {
    getMyProfile, updateMyProfile
}