import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // adjust based on your auth setup

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userInfo } = useAuth(); // or however you fetch user info

  if (!userInfo) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    // Logged in but wrong role
    return <Navigate to="/" />;
  }

  // Correct role
  return children;
};

export default ProtectedRoute;
