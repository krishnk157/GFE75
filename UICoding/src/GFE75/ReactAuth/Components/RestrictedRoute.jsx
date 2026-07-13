import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RestrictedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading....</div>;

  if (user)
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  return children;
};

export default RestrictedRoute;
