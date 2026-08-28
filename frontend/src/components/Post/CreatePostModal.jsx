import { useState, useEffect } from "react";
import { createPost } from "../../services/postService";
import { X } from "lucide-react";
import { getAllGames } from "../../services/gameService";

const CreatePostModal = ({ onClose, onPostCreated }) => {
    const [formData, setFormData] = useState({
        game_id: "",
        content: "",
    });
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getAllGames();
                setGames(data.games);
            } catch (error) {
                console.error("Không lấy được danh sách game:", error);
            }
        };

        fetchGames();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await createPost(formData);

            onPostCreated(data.post);

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
            <div
                className="
                    w-full max-w-lg
                    rounded-card
                    border border-border
                    bg-surface
                    p-5
                    shadow-dropdown
                    "
            >

                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-display text-lg font-bold text-ink shrink-0">
                            Tạo bài viết
                        </h2>

                        <select
                            name="game_id"
                            value={formData.game_id}
                            onChange={handleChange}
                            className="
                                w-[140px]
                                truncate
                                rounded-control
                                border border-border
                                bg-control
                                py-1 px-2
                                text-xs font-medium text-ink
                                outline-none
                                focus:border-secondary
                                cursor-pointer
                                "
                        >
                            <option value="">Chọn game</option>
                            {games.map((game) => (
                                <option key={game.id} value={game.id}>
                                    {game.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-muted hover:text-ink shrink-0 cursor-pointer"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Bạn đang nghĩ gì?"
                        className="
                            min-h-32 w-full resize-none
                            rounded-card
                            border border-border
                            bg-control
                            p-3
                            text-ink
                            outline-none
                            "
                    />

                    <button
                        type="submit"
                        className="
                            mt-4 w-full
                            rounded-control
                            [background:var(--gradient-brand)]
                            py-3
                            font-display font-bold text-white
                            "
                    >
                        Đăng bài
                    </button>
                </form>


            </div>
        </div>
    );
};

export default CreatePostModal;