import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoutes = () => {
  const { user } = useUserStore();
  return (
    <div>{user?.isVerified ? <Navigate to="/"></Navigate> : <Outlet />}</div>
  );
};
