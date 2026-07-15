import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { user } = useUserStore();

  return (
    <div>{user?.admin ? <Outlet /> : <Navigate to="/login" replace />}</div>
  );
};
