import { NavLink } from "react-router-dom";
import { House, Gamepad2, Trophy, MessageCircle, User, FileText, Bookmark, ChartNoAxesColumnIncreasing, SquareText } from "lucide-react";

const LeftSidebar = () => {


    return (
        <aside className="sticky top-12">
            <nav className="flex flex-col gap-1 font-display font-bold">

                <NavLink
                    to="/"
                    className="flex items-center gap-3 rounded-control px-4 py-2.5 text-muted hover:bg-hover hover:text-secondary"
                >
                    <House/>
                    <span>Bảng tin</span>
                </NavLink>

                <NavLink
                    to="/rooms"
                    className="flex items-center gap-3 rounded-control px-4 py-2.5 text-muted hover:bg-hover hover:text-secondary"
                >
                    <Gamepad2/>
                    <span>Tìm bạn</span>
                </NavLink>


                <NavLink
                    to="/profile"
                    className="flex items-center gap-3 rounded-control px-4 py-2.5 text-muted hover:bg-hover hover:text-secondary"
                >
                    <User />
                    <span>Hồ sơ</span>
                </NavLink>

                <p className="mt-4 px-4 text-sm font-bold  tracking-wide text-muted">
                    QUẢN LÝ
                </p>

                <button className="flex items-center gap-3 rounded-control px-4 py-2.5 text-left text-muted hover:bg-hover hover:text-secondary">
                    <SquareText />
                    <span>Bài đăng của tôi</span>
                </button>

            

            </nav>
        </aside>
    );
};

export default LeftSidebar;