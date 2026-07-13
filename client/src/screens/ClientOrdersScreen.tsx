import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { CartItem } from "@/types/cartTypes";
import { IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ClientOrdersScreen = () => {
  // const orders = [1, 2, 3];
  const { orders, getOrderDetails } = useOrderStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    getOrderDetails();
    clearCart();
  }, []);
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
        {orders.map((order: any, idx: number) => (
          <div key={idx}>
            {order.cartItems.map((item: CartItem) => (
              <>
                <div className="space-y-2 mb-3">
                  <div className="px-3 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item?.image}
                        alt="dish"
                        className="h-12 w-14 object-cover rounded-md "
                      />
                      <h1 className="text-gray-600 text-md font-semibold">
                        {item.name}
                      </h1>
                    </div>
                    <div className="">
                      <h1 className="flex items-center">
                        {" "}
                        <IndianRupee />{" "}
                        <span className="text-orange font-semibold text-lg">
                          {item.price}
                        </span>
                      </h1>
                    </div>
                  </div>

                  <Separator className="h-[2px] bg-gray-600 m-4" />
                </div>
              </>
            ))}
          </div>
        ))}

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
