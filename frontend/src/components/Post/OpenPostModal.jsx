import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const OpenPostModal = ({ onPostCreated }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="rounded-card border border-border bg-[var(--panel-bg)] p-4 shadow-card"
            >
                <div className="flex items-center gap-3">


                    <div
                        className="
                            flex h-10 w-10 shrink-0 items-center justify-center
                            rounded-control
                            [background:var(--gradient-brand)]
                            font-display font-bold text-white
                            "
                    >
                        U
                    </div>

                    <div className="flex-1 rounded-control border border-border bg-control px-4 py-3 text-sm text-muted cursor-pointer">
                        Bạn đang nghĩ gì?
                    </div>

                    <button
                        className="
                            shrink-0
                            rounded-control
                            [background:var(--gradient-brand)]
                            px-5 py-3
                            font-display text-sm font-bold text-white
                            shadow-glow
                            cursor-pointer
                            "
                    >
                        Đăng bài
                    </button>
                </div>

            </div>

            {open && (
                <CreatePostModal
                    onClose={() => setOpen(false)}
                    onPostCreated={onPostCreated}
                />
            )}
        </>
    );
};

export default OpenPostModal;