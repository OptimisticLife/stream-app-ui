import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
type ProtectedRoutePropType = {
  children: React.ReactNode;
};
function ProtectedRoute({ children }: ProtectedRoutePropType) {
  const { isAuthenticated, refreshAuthStatus } = useAuth();

  useEffect(() => {
    refreshAuthStatus();
  }, [refreshAuthStatus]);

  console.log("isAuthenticated from ProtectedRoute:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
