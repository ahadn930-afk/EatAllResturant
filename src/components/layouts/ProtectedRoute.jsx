import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role } = useAuth();

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  // Logged in but wrong role → go to their own dashboard
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"} />;
  }

  return children;
};

export default ProtectedRoute;