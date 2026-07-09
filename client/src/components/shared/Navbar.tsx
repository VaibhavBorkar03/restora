import { Link, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  ClipboardList,
  Loader2,
  Menu,
  Moon,
  Receipt,
  ShoppingCart,
  Store,
  Sun,
  User2,
  Utensils,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { useUserStore } from "@/store/useUserStore";
import api from "@/lib/axios";
import { toast } from "sonner";

export const Navbar = () => {
  const { user, setUser, setAuthenticated, loading } = useUserStore();
  const navigate = useNavigate();

  // console.log(user);

  const handleLogout = async () => {
    try {
      const response = await api.post(`/api/v1/user/logout`);
      if (response.data.success) {
        setUser(null);
        setAuthenticated(false);

        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14 mx-4">
        <Link to="/">
          <h2 className="text-gray-900 font-bold text-2xl">
            Rest<span className=" text-orange font-extrabold">Ora</span>
          </h2>
        </Link>
        <div className="hidden md:flex items-center gap-14">
          <div className="hidden md:flex  items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order">Order</Link>
            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link to="/admin/restaurent">Restaurent</Link>
                    </MenubarItem>
                    <MenubarItem>
                      {" "}
                      <Link to="/admin/menu">Menu</Link>
                    </MenubarItem>
                    <MenubarItem>
                      {" "}
                      <Link to="/admin/orders">Orders</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun
                      className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 
                         dark:-rotate-90 dark:scale-0 text-yellow-500"
                    />
                    <Moon
                      className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 
                          dark:rotate-0 dark:scale-100 text-slate-200"
                    />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>light</DropdownMenuItem>
                  <DropdownMenuItem>dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart">
              <ShoppingCart />
            </Link>
            <div>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="mx-8">
              {loading ? (
                <Button className="bg-orange w-full">
                  <Loader2 className="animate-spin" /> Please wait..
                </Button>
              ) : (
                <Button onClick={handleLogout} className="bg-orange w-full">
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

const MobileNavbar = () => {
  const { user, setUser, setAuthenticated, loading } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await api.post(`/api/v1/user/logout`);
      if (response.data.success) {
        setUser(null);
        setAuthenticated(false);

        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-gray-300 text-black rounded-lg hover:bg-gray-500"
          size="icon"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white">
        <SheetHeader className="flex flex-row justify-between items-center mt-6">
          <SheetTitle>
            {" "}
            <h2 className="text-gray-900 font-bold text-2xl">
              Rest<span className=" text-orange font-extrabold">Ora</span>
            </h2>
          </SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-yellow-500" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-slate-200" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-1 z-[100]"
            >
              <DropdownMenuItem>light</DropdownMenuItem>
              <DropdownMenuItem>dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="w-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User2 />
            Profile
          </Link>
          <Link
            to="/order"
            className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ClipboardList /> Order
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart />
            Cart
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Utensils />
                Menu
              </Link>
              <Link
                to="/admin/restaurent"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Store />
                Restaurent
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Receipt />
                Restaurent Order
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter>
          {/* avatar */}
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="font-bold text-xl">ResTora</h2>
          </div>

          {loading ? (
            <Button className="bg-orange w-full">
              <Loader2 className="animate-spin" /> Please wait..
            </Button>
          ) : (
            <Button onClick={handleLogout} className="bg-orange w-full">
              Logout
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
