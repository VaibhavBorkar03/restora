import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { checkingAuth, isAuthenticated } = useUserStore();
  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}</div>
  );
};
