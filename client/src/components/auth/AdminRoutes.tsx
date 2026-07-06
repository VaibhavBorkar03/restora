import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { user, isAuthenticated } = useUserStore();
  console.log("admin routes, user", user, isAuthenticated);
  console.log("admin , user", user?.admin);
  return <div>{user?.admin ? <Outlet /> : <Navigate to="/login" replace />}</div>;
};
