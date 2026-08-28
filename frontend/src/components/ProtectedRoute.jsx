import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user, token, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}></div>;
    }

    if(!user || !token){
        return <Navigate to="/login"></Navigate>
    }

    return <Outlet />
};

export default ProtectedRoute;