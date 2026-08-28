import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";



const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] =  useState("");
    const [error, setError] = useState("");

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const data = await login(email, password);
            
            loginUser(data.user, data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Đăng nhập thất bại");
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
                        Chào mừng trở lại
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Đăng nhập để tiếp tục với SGM
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        
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
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                                    w-full
                                    rounded-control
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
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                                    w-full
                                    rounded-control
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
                        <LogIn size={18} />
                        Đăng nhập
                    </button>

                </form>

    
                <p className="mt-6 text-center text-sm text-muted">
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="font-bold text-secondary hover:underline"
                    >
                        Đăng ký
                    </Link>
                </p>
            </div>

        </div>
    );
}

export default LoginPage;