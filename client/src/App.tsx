import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/shared/MainLayout";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { ResetPassword } from "./components/auth/ResetPassword";
import { VerifyEmail } from "./components/auth/VerifyEmail";
import HomeScreen from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import { RestaurentDetailScreen } from "./screens/RestaurentDetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { RestaurentScreen } from "./screens/admin/RestaurentScreen";
import { AddMenuScreen } from "./screens/admin/AddMenuScreen";
import RestaurentOrdersScreen from "./screens/admin/RestaurentOrdersScreen";
import ClientOrdersScreen from "./screens/ClientOrdersScreen";
import { AdminRoutes } from "./components/auth/AdminRoutes";
import { PrivateRoutes } from "./components/auth/PrivateRoutes";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import { AuthRoutes } from "./components/auth/AuthRoutes";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        //public routes
        { index: true, element: <HomeScreen /> },
        {
          element: <PrivateRoutes />,
          children: [
            { path: "/profile", element: <ProfileScreen /> },
            { path: "/search", element: <SearchScreen /> },
            { path: "/restaurent/:id", element: <RestaurentDetailScreen /> },
            { path: "/cart", element: <CartScreen /> },
            { path: "/order", element: <ClientOrdersScreen /> },
          ],
        },

        //admin routes
        {
          element: <AdminRoutes />,
          children: [
            { path: "/admin/restaurent", element: <RestaurentScreen /> },
            { path: "/admin/menu", element: <AddMenuScreen /> },
            { path: "/admin/orders", element: <RestaurentOrdersScreen /> },
          ],
        },
        {
          element: <AuthRoutes />,
          children: [
            { path: "/signup", element: <SignUp /> },
            { path: "/login", element: <Login /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/reset-password/:token", element: <ResetPassword /> },
            { path: "/verify-email", element: <VerifyEmail /> },
          ],
        },
      ],
    },
  ]);

  const { checkAuthentication } = useUserStore();

  useEffect(() => {
    checkAuthentication();
  }, []);

  // if (checkingAuth) return <p>Loading</p>;
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
