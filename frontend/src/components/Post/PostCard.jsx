import { useEffect, useState } from "react";
import { toggleReaction, getReactionsByPost } from "../../services/postService";
import { useAuth } from "../../context/AuthContext";
import CommentSection from "./CommentSection";
import { Heart, MessageCircle } from 'lucide-react';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const { user } = useAuth();
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const fetchReactions = async () => {
            try {
                const data = await getReactionsByPost(post.id);
                setLikeCount(data.total);

                const isLiked = data.reactions.some(
                    (reaction) => reaction.user_id === user.id
                );

                setLiked(isLiked);

            } catch (error) {
                console.error(error);
            }
        };
        fetchReactions();

    }, [post.id, user.id]);



    const handleLike = async () => {
        try {
            const data = await toggleReaction(post.id);
            setLiked(data.liked)

            setLikeCount((prev) =>
                data.liked ? prev + 1 : prev - 1
            );
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <article
            className="
                rounded-card
                border border-border
                bg-[var(--panel-bg)]
                p-5
                shadow-card
                [backdrop-filter:var(--panel-blur)]
                "
        >

            <div className="mb-3 flex items-start gap-3">
                <img
                    src="avatar.jpg"
                    alt={post.author?.username}
                    className="
                        h-12 w-12
                        shrink-0
                        rounded-full
                        object-cover
                        "
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <span className="font-display text-[15px] font-extrabold text-ink">
                            {post.author?.username}
                        </span>

                        <span
                            className="
                                shrink-0
                                rounded-small
                                border border-secondary/30
                                bg-secondary/10
                                px-2.5 py-1
                                text-xs font-bold
                                text-secondary
                                "
                        >
                            {post.game?.name}
                        </span>
                    </div>


                </div>
            </div>


            <p className="mb-4 leading-7 text-ink">
                {post.content}
            </p>

            <div className="flex items-center border-t border-border pt-3">
                <button
                    onClick={handleLike}
                    className={`
                        flex items-center gap-2
                        rounded-control
                        px-3 py-2
                        text-sm font-semibold
                        transition
                        cursor-pointer

        `}
                >
                    <Heart
                        size={20}
                        className={liked ? "text-red-500 fill-red-500" : "text-gray-500"}
                    />
                    {likeCount}
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className="
                        ml-auto
                        flex items-center gap-2
                        rounded-control
                        px-3 py-2
                        text-sm font-semibold
                        text-muted
                        transition
                        hover:bg-hover
                        hover:text-secondary
                        cursor-pointer
                        "
                >
                    <MessageCircle size={20} />
                    <span>{post.commentCount}</span>
                </button>
            </div>

            {showComments && (
                <CommentSection postId={post.id} />
            )}
        </article>
    );
}

export default PostCard;