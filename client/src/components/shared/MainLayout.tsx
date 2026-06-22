import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
// import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen md:0 m-2">
        <header>
          <Navbar />
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
        <footer>
          {/* <Footer /> */}
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
