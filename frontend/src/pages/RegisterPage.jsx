import { useState } from "react"
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        console.log("Dữ liệu chuẩn bị gửi đi là:", formData); 

        try {
            await register(formData);
            
            navigate("/login");
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.response?.data?.error;
            console.error(error);
            setError(error.response?.data?.message || "Đăng ký thất bại");
        }

    }
    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
            <div
                className="
                    w-full max-w-md
                    rounded-card
                    border border-border
                    bg-[var(--panel-bg)]
                    p-8
                    shadow-card
                    [backdrop-filter:var(--panel-blur)]
                    "
            >
                    
                <div className="mb-7 text-center">
                    <div
                        className="
                            mx-auto mb-3
                            flex h-12 w-12 items-center justify-center
                            rounded-control
                            [background:var(--gradient-brand)]
                            font-display text-xl font-extrabold text-white
                            "
                    >
                        G
                    </div>

                    <h1 className="font-display text-2xl font-extrabold text-ink">
                        Tạo tài khoản
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Tham gia cộng đồng SGM
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-ink">
                            Tên người dùng
                        </label>

                        <div className="relative">
                            <User
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                            />

                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="NightGamer"
                                className="
                                    w-full rounded-control
                                    border border-border
                                    bg-control
                                    py-3 pl-10 pr-4
                                    text-sm text-ink
                                    outline-none
                                    placeholder:text-muted
                                    focus:border-secondary
                                    "
                            />
                        </div>
                    </div>

            
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-ink">
                            Email
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                            />

                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                className="
                                    w-full rounded-control
                                    border border-border
                                    bg-control
                                    py-3 pl-10 pr-4
                                    text-sm text-ink
                                    outline-none
                                    placeholder:text-muted
                                    focus:border-secondary
                                    "
                            />
                        </div>
                    </div>

                    
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-ink">
                            Mật khẩu
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                            />

                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu"
                                className="
                                    w-full rounded-control
                                    border border-border
                                    bg-control
                                    py-3 pl-10 pr-4
                                    text-sm text-ink
                                    outline-none
                                    placeholder:text-muted
                                    focus:border-secondary
                                    "
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-primary">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="
                            mt-1
                            flex items-center justify-center gap-2
                            rounded-control
                            [background:var(--gradient-brand)]
                            py-3
                            font-display font-bold text-white
                            shadow-glow
                            transition
                            hover:-translate-y-0.5
                            cursor-pointer
                            "
                    >
                        <UserPlus size={18} />
                        Đăng ký
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    Đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-secondary hover:underline"
                    >
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;