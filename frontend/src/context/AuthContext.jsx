import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] =  useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser =  localStorage.getItem("user");

        if(savedToken && savedUser) {
            setToken(savedToken);   
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false); 
    }, []);

    const loginUser = (userData, tokenData) => {
        setToken(tokenData);
        setUser(userData);

        localStorage.setItem("token", tokenData );
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logoutUser = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser }}>
            { children }
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
}
