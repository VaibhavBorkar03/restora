import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const ClientOrdersScreen = () => {
  const orders = [1, 2, 3];
  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="font-bold text-2xl"> Order Not Found</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen md:justify-center md:items-center">
      <div className="shadow-lg md:w-1/3 rounded-lg w-full ">
        <div className="text-center">
          <h1 className="font-bold text-xl">
            Order Status :{" "}
            <span className="text-red-600 font-bold">
              {"confirmed".toUpperCase()}
            </span>
          </h1>
        </div>
        <h2 className="text-gray-400 font-semibold p-3">Order Summary</h2>
        <div className="space-y-4">
          <div className="px-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn.britannica.com/40/177340-050-2F922898/Chicken-tikka-masala.jpg"
                alt="dish"
                className="h-12 w-14 object-cover rounded-md "
              />
              <h1 className="text-gray-600 text-md font-semibold">Pizza</h1>
            </div>
            <div className="">
              <h1 className="flex items-center">
                {" "}
                <IndianRupee />{" "}
                <span className="text-orange font-semibold text-lg">80</span>
              </h1>
            </div>
          </div>
          <Separator className="h-[2px] bg-gray-600 m-4" />
        </div>
        <div className="p-2 my-2">
          <Link to="/cart">
            <Button className="w-full bg-orange">Continue shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientOrdersScreen;
