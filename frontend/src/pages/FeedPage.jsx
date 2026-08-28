import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import PostCard from "../components/Post/PostCard";
import OpenPostModal from "../components/Post/OpenPostModal";
import LeftSidebar from "../components/LeftSidebar";


const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data.posts)
            } catch (error) {
                console.error(error);
                console.log("Backend chưa sẵn sàng, đang thử lại sau 3 giây...", error);
                
                setTimeout(fetchPosts, 3000); 
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []); 


    if (loading) {
        return <div>Đang tải....</div>
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handlePostCreated = (newPost) => {
        setPosts((prevPosts) => [
            newPost,
            ...prevPosts
        ]);
    }

    return (
        <div className="mx-auto grid max-w[1300px] grid-cols-[220px_minmax(0,1fr)_310px] 
                        gap-6 px-5 py-5 items-start
                        "
        >
            <aside>
                <LeftSidebar>

                </LeftSidebar>
            </aside>

            
            <main className="flex flex-col gap-4">
                
                <OpenPostModal onPostCreated={handlePostCreated} />

                {posts.length === 0 ? (
                    <p>Chưa có bài viết nào</p>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))
                )}
            </main>

            
            <aside>
                Right
            </aside>
        </div>
    );
}

export default FeedPage;