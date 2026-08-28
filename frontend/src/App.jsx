import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { ThemeProvider } from "./context/ThemeContext";


function App() {
  return (
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />


        <Route element={<ProtectedRoute />}>

            <Route element={<MainLayout />}>

              <Route path="/" element={<FeedPage />} /> 
              <Route path="/profile"/> 
              <Route path="/rooms"/> 

            </Route>

        </Route>
      </Routes>    
  );
}

export default App;