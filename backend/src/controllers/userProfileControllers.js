const { UserProfile } = require("../models/index.js");

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await UserProfile.findOne({
            where: { user_id: userId }
        });

        if (!profile) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
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


        let profile = await UserProfile.findOne({ where: { user_id: userId } });

        if (!profile) {

            profile = await UserProfile.create({
                user_id: userId,
                avatar_url,
                bio,
                favorite_game,
                main_rank,
                play_time,
                preferred_role
            });
        } else {

            await profile.update({
                avatar_url: avatar_url === undefined ? profile.avatar_url : avatar_url,
                bio: bio === undefined ? profile.bio : bio,
                favorite_game: favorite_game === undefined ? profile.favorite_game : favorite_game,
                main_rank: main_rank === undefined ? profile.main_rank : main_rank,
                play_time: play_time === undefined ? profile.play_time : play_time,
                preferred_role: preferred_role === undefined ? profile.preferred_role : preferred_role,
            });
        }


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