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

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomeScreen /> },
        { path: "/profile", element: <ProfileScreen /> },
        { path: "/search", element: <SearchScreen /> },
      ],
    },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/verify-email", element: <VerifyEmail /> },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
