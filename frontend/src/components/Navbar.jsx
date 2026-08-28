import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Bell, ChevronDown, User, LogOut, Palette } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 h-14 border-b border-border bg-[var(--panel-bg)] shadow-card [backdrop-filter:var(--panel-blur)]">
            <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-3">

                {/* LEFT  */}
                <div className="flex items-center gap-5">

                    <NavLink to="/" className="flex items-center gap-2">
                        <div
                            className="
                                flex h-9 w-9 items-center justify-center
                                rounded-control
                                [background:var(--gradient-brand)]
                                font-display text-lg font-extrabold text-white
                                "
                        >
                            G
                        </div>

                        <span className="font-display text-xl font-extrabold text-ink">
                            SGM
                        </span>
                    </NavLink>

                    {/* Search */}
                    <button
                        className=" 
                        flex h-9 w-9 items-center justify-center
                        rounded-control
                        border border-border
                        text-muted
                        transition
                        hover:border-secondary
                        hover:text-secondary
                        cursor-pointer
                        "
                    >
                        <Search size={18} />
                    </button>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                    {/* Notification */}
                    <button
                        className="
                            flex h-9 w-9 items-center justify-center
                            rounded-control
                            border border-border
                            text-muted
                            transition
                            hover:border-primary
                            hover:text-primary
                            cursor-pointer
                            "
                    >
                        <Bell size={18} />
                    </button>

                    {/* User */}
                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="
                                flex items-center gap-2
                                rounded-control
                                border border-border
                                px-1.5 py-1
                                pr-3
                                text-ink
                                transition
                                hover:border-secondary
                                cursor-pointer
                                "
                        >
                            <div
                                className="
                                    flex h-8 w-8 items-center justify-center
                                    rounded-control
                                    [background:var(--gradient-brand)]
                                    font-display font-bold text-white
                                    "
                            >
                                {user?.username?.charAt(0).toUpperCase() || "U"}
                            </div>

                            <span className="font-display text-sm font-bold">
                                {user?.username || "User"}
                            </span>

                            <ChevronDown size={14} />                            
                        </button>

                        {userMenuOpen && (
                            <div
                                className="
                                    absolute right-0 mt-2
                                    w-50
                                    overflow-hidden 
                                    rounded-card
                                    border border-border
                                    bg-surface
                                    shadow-dropdown
                                    "
                            >
                                <div className="border-b border-border px-4 py-3">
                                    <p className="font-display font-bold text-ink">
                                        {user?.username}
                                    </p>
                                </div>

                                <div className="p-2">

                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="
                                            w-full rounded-control
                                            px-3 py-2
                                            text-left text-sm text-ink
                                            cursor-pointer
                                            "
                                    >
                                        <div className="flex items-center gap-2">
                                            <User size={18} />
                                            <span>Hồ sơ</span>
                                        </div>
                                    </button>


                                        <button
                                            onClick={toggleTheme}
                                            title={`Chuyển sang ${theme === "normal" ? "Gaming" : "Normal"
                                                }`}
                                            className="
                                                w-full rounded-control
                                                px-3 py-2
                                                text-left text-sm text-ink
                                                cursor-pointer
                                                "
                                        >
                                            <div className="flex items-center gap-2">
                                                <Palette size={18} />
                                                <span>Giao diện khác</span>
                                            </div>
                                        </button>


                                    <button
                                        onClick={handleLogout}
                                        className="
                                            w-full rounded-control
                                            px-3 py-2
                                            text-left text-sm text-primary
                                            cursor-pointer
                                            "
                                    >
                                        <div className="flex items-center gap-2">
                                            <LogOut size={16} />
                                            <span>Đăng xuất</span>
                                        </div>
                                    </button>


                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
