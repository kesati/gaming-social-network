const { User, UserProfile, Post, Reaction } = require("../models/index");


const toggleReaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        if (!post || post.status === "deleted") {
            return res.status(400).json({ message: "Bài viết không tồn tại!" });
        }

        const reaction = await Reaction.findOne({
            where: {
                post_id: postId,
                user_id: userId
            }
        });

        if (reaction) {
            await reaction.destroy();

            return res.status(200).json({
                message: "Đã bỏ thích bài viết",
                liked: false,
            });
        } else {
            await Reaction.create({
                post_id: postId,
                user_id: userId
            });

            return res.status(200).json({
                message: "Đã thích bài viết",
                liked: true,
            });
        }

    } catch (error) {

        console.error(error);

        return res.status(500).json({ message: "Lỗi server!" });
    }

}

const getReactionsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId);
        if (!post || post.status === 'deleted') {
            return res.status(404).json({ message: 'Bài viết không tồn tại!' });
        }

        const reactions = await Reaction.findAll({
            where: { post_id: postId },
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username'],
                    include: [
                        {
                            model: UserProfile,
                            as: 'profile',
                            attributes: ['avatar_url']
                        }
                    ]
                }
            ]
        });

        return res.status(200).json({
            total: reactions.length,
            reactions
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

module.exports = {
    toggleReaction, getReactionsByPost
}