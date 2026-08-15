const { User, Post, Comment, UserProfile } = require("../models/index");


const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        const { content } = req.body;


        if (!content || content.trim() === 0) {
            return res.status(404).json({ message: "Vui lòng điền nội dung!" });
        }

        if (content.lenght > 500) {
            return res.status(404).json({ message: "Nội dung tối đa 500 ký tự" });
        }

        const post = await Post.findByPk(postId);

        if (!post || post.status === "deleted") {
            return res.status(404).json({ message: "Bài viết không tồn tại!" });
        }

        const newComment = await Comment.create({
            post_id: postId,
            user_id: userId,
            content,
        });

        return res.status(201).json({
            message: 'Đã gửi bình luận!',
            comment: newComment
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }

}

const getComment = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(postId);

        if (!post || post.status === "deleted") {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }

        const comments = Comment.findAll({
            where: { post_id: postId},
            include: [["created_at", "ASC"]],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username"],
                    include: [
                        {
                            model: UserProfile,
                            as: "profile",
                            attributes: ["id","avatar_url"]
                        }
                    ]
                }
            ]
        });

        return res.status(200).json({
            total: comments.length,
            comments
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Lỗi server"
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId, postId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findOne({
            where: {
                id: commentId,
                post_id: postId
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Bình luận không tồn tại!" });
        }

        if (comment.user_id !== userId) {
            return res.status(403).json({ message: "Bạn không có quyền xóa bình luận này!" });
        }

        await comment.destroy();

        return res.status(200).json({ message: 'Xóa bình luận thành công!' });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Lỗi server!" });
    }
}

module.exports = {
    createComment, getComment, deleteComment
}