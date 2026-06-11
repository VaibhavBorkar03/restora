import { Link } from "react-router-dom";
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
import { Loader2, Moon, ShoppingCart, Sun } from "lucide-react";

export const Navbar = () => {
  const loading = false;
  const admin = true;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h2>RestOra</h2>
        </Link>
        <div className="hidden md:flex items-center gap-14">
          <div className="hidden md:flex  items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/">Profile</Link>
            <Link to="/">Order</Link>
            {admin && (
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
            <div className="p-5">
              {loading ? (
                <Button className="bg-orange w-full">
                  <Loader2 className="animate-spin" /> Please wait..
                </Button>
              ) : (
                <Button className="bg-orange w-full">Logout</Button>
              )}
            </div>
          </div>
          <div>
            <MobileNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNavbar = () => {
  return <div></div>;
};
