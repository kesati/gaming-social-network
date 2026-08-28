import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { creatComment, getComment, deleteComment } from "../../services/commentService";
import { Send, Trash2 } from "lucide-react";



const CommentSection = ({ postId }) => {
    const { user } = useAuth();
    const [comments, setComment] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComment(postId);

                setComment(data.comments);
            } catch (error) {
                console.error(error);
                setError("Không thể tải bình luận");
            } finally {
                setLoading(false);
            }
        };
        fetchComments();

    }, [postId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        try {
            const data = await creatComment(postId, content);

            setComment((prevComments) => [
                ...prevComments,
                data.comment
            ]);

            setContent("");

        } catch (error) {
            console.error(error);
        }
    };


    const handleDelete = async (commentId) => {
        try {
            await deleteComment(postId, commentId);

            setComment((prevComments) =>
                prevComments.filter(
                    (comment) => comment.id !== commentId
                )
            );

        } catch (error) {
            console.error(error);
        }
    };


    if (loading) {
        return <p>Đang tải bình luận...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="mt-2 border-border">

            <div className=" flex flex-col gap-3">
                {comments.length === 0 ? (
                    <p className="text-sm text-muted">
                        Chưa có bình luận nào
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="
                                rounded-small
                                bg-surface-soft
                                px-3 py-2
                                "
                        >
                            <div className="flex items-start justify-between gap-3">

                                <div>
                                    <p className="font-display text-sm font-bold text-ink">
                                        {comment.author?.username}
                                    </p>

                                    <p className="mt-1 text-sm text-ink">
                                        {comment.content}
                                    </p>
                                </div>

                                {comment.user_id === user?.id && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="
                                            text-muted
                                            transition
                                            hover:text-primary
                                            cursor-pointer
                                            "
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                )}

                            </div>
                        </div>
                    ))
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className=" mt-8 flex items-center gap-2"
            >
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="
                        flex-1
                        rounded-control
                        border border-border
                        bg-control
                        px-4 py-2
                        text-sm text-ink
                        outline-none
                        placeholder:text-muted
                        focus:border-secondary
                        "
                />

                <button
                    type="submit"
                    className="
                        flex h-9 w-9 items-center justify-center
                        rounded-control
                        bg-primary
                        text-white
                        transition
                        hover:opacity-90
                        cursor-pointer
                        "
                >
                    <Send size={16} />
                </button>
            </form>

        </div>
    );

};

export default CommentSection;