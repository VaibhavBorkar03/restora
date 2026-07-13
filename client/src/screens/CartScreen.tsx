import { CheckoutDialog } from "@/components/shared/CheckoutDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartTypes";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const CartScreen = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  } = useCartStore();
  

  const totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);
  const [open, setOpen] = useState<boolean>(false);


  
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <Button onClick={clearCart} variant={"link"}>
            Clear All
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item: CartItem) => (
              <>
                <TableRow>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item.image} />
                      <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center w-fit border border-gray-400 rounded-full shadow-md">
                      <Button
                        variant={"outline"}
                        onClick={() => decrementQuantity(item._id)}
                        className="bg-gray-400 rounded-full hover:bg-slate-700"
                      >
                        <Minus size="icon" className="rounded-full" />
                      </Button>
                      <Button variant={"outline"} disabled>
                        {item.quantity}
                      </Button>
                      <Button
                        variant={"outline"}
                        onClick={() => incrementQuantity(item._id)}
                        className="bg-orange rounded-full hover:bg-hoverOrange"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{totalAmount}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-orange text-sm hover:bg-hoverOrange"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-xl font-bold">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">{totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end py-2">
          <Button onClick={() => setOpen(true)} className="bg-orange">
            Proceed to Checkout
          </Button>
        </div>
      </div>
      <CheckoutDialog open={open} setOpen={setOpen} />
    </div>
  );
};
