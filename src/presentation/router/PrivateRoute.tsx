import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth"; // Sesuaikan path

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Jika tidak terautentikasi dan bukan di halaman login, arahkan ke login
  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <>{children}</>;
};