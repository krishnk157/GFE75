import "./AuthApp.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import RestrictedRoute from "./Components/RestrictedRoute";
import Login from "./Components/Login";
import About from "./Components/About";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashbBoard from "./Components/DashbBoard";

const AuthApp = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <Login />
                </RestrictedRoute>
              }
            />
            <Route path="/about-us" element={<About />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashbBoard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AuthApp;
