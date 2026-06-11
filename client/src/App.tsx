import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/shared/MainLayout";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { ForgotPassword } from "./components/auth/ForgotPassword";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <div>Home</div> }],
    },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
