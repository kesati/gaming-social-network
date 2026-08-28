const { User, UserProfile, Game, Post } = require("../models/index.js");
const sequelize = require("../config/db");
const { Op } = require("sequelize");

const createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { game_id, content, image_url } = req.body || {};

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: "Nội dung không được để trống" });
        }

        if (content.length > 2000) {
            return res.status(400).json({ message: "Nội dung tối đa 2000 ký tự" });
        }

        const game = await Game.findByPk(game_id);

        if (!game || game.status === "hidden") {
            return res.status(400).json({ message: "Game không tồn tại hoặc không khả dụng" });
        }

        const newPost = await Post.create({
            user_id: userId,
            game_id,
            content,
            image_url,
        });

        const fullPost = await Post.findByPk(newPost.id, {
            include: [
                {
                    model: User,
                    as: 'author', 
                    attributes: ['username']
                },
                {
                    model: Game,
                    as: 'game',
                    attributes: ['name'] 
                }
            ]
        });

        return res.status(201).json({   
            message: "Đăng bài thành công",
            post: fullPost
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }

}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { status: "visible" },
            order: [["created_at", "DESC"]],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"],
                },
                {
                    model: Game,
                    as: "game",
                    attributes: ["id", "name"],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                            `(SELECT COUNT(*) FROM reactions WHERE reactions.post_id = Post.id)`
                        ),
                        "reactionCount",
                    ],
                    [
                        sequelize.literal(
                            `(SELECT COUNT(*) FROM comments WHERE comments.post_id = Post.id)`
                        ),
                        "commentCount",
                    ],
                ],
            },
        });

        return res.status(200).json({
            total: posts.length,
            posts
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findOne({
            where: {
                id: postId,
                status: "visible"
            },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"],
                },
                {
                    model: Game,
                    as: "game",
                    attributes: ["id", "name"],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                            `(SELECT COUNT(*) FROM reactions WHERE reactions.post_id = Post.id)`
                        ),
                        "reactionCount",
                    ],
                    [
                        sequelize.literal(
                            `(SELECT COUNT(*) FROM comments WHERE comments.post_id = Post.id)`
                        ),
                        "commentCount",
                    ],
                ],
            },
        });

        if (!post || post.status === "deleted") {
            return res.status(404).json({
                message: "Bài viết không tồn tại"
            });
        }

        return res.status(200).json({
            message: "Lấy bài viết thành công",
            post
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const { content, image_url } = req.body || {} ;

        const post = await Post.findByPk(postId);

        if (!post || post.status === "deleted") {
            return res.status(404).json({ message: "Không tìm thấy bài viết!" });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: "Người dùng không hợp lệ" });
        }

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: "Nội dung không được để trống" });
        }

        if (content.length > 2000) {
            return res.status(400).json({ message: "Nội dung tối đa 2000 ký tự" });
        }

        await post.update({
            content: content ?? post.content,
            image_url: image_url === undefined ? post.image_url : image_url,

        })

        return res.status(200).json({
            message: "Cập nhật bài viết thành công",
            post,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Lỗi server!" });
    }
}

const deletePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: "Bạn không có quyền xóa bài viết này" });
        }

        await post.update({ status: "deleted" });

        return res.status(200).json({ message: "Xóa bài viết thành công" });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Lỗi server!" });
    }
}

const searchPosts = async (req, res) => {
    try {
        const { keyword, game_id } = req.query;

        const whereCondition = { status: "visible" };

        if (keyword && keyword.trim().length > 0) {
            whereCondition.content = { [Op.like]: `%${keyword.trim()}%` };
        }

        if (game_id) {
            whereCondition.game_id = game_id;
        }

        const posts = await Post.findAll({
            where: whereCondition,
            order: [["created_at", "DESC"]],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"],
                    include: [
                        {
                            model: UserProfile,
                            as: "profile",
                            attributes: ["avatar_url"]
                        }
                    ]
                },
                {
                    model: Game,
                    as: "game",
                    attributes: ["id", "name", "logo_url"]
                }
            ]
        });

        return res.status(200).json({
            total: posts.length,
            posts
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}
module.exports = {
    createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts
}