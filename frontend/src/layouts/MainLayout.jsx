import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <>
            <div className="min-h-screen text-ink transition-colors duration-300">
                <Navbar />

                <main className="w-full px-20 py-2 ">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default MainLayout;