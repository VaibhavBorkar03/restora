import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/orderTypes";
import { useOrderStore } from "@/store/useOrderStore";
import { useRestaurentStore } from "@/store/useRestaurentStore";
import { useCartStore } from "@/store/useCartStore";

export const CheckoutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { createCheckoutSession } = useOrderStore();
  const { restaurent } = useRestaurentStore();
  const { cart,  } = useCartStore();
  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const chackoutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity,
          image: cartItem.image,
          name: cartItem.name,
        })),
        deliveryDetails: input,
        restaurentId: restaurent?._id as string,
      };

      console.log("checkoutData", checkoutData);

      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Review Your Order
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
            eveniet sequi sed perspiciatis asperna
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={chackoutHandler}
          className="grid md:grid-cols-2 space-y-2 md:space-y-0 gap-2"
        >
          <div>
            <Label className="mb-2">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter name"
              name="name"
              value={input.name}
              onChange={inputHandler}
            />
          </div>
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              disabled
              placeholder="Enter Email"
              name="email"
              value={input.email}
              onChange={inputHandler}
            />
          </div>
          <div>
            <Label className="mb-2">Contact</Label>
            <Input
              type="number"
              placeholder="Enter Contact"
              name="contact"
              value={input.contact}
              onChange={inputHandler}
            />
          </div>
          <div>
            <Label className="mb-2">Address</Label>
            <Input
              type="text"
              placeholder="Enter Address"
              name="address"
              value={input.address}
              onChange={inputHandler}
            />
          </div>
          <div>
            <Label className="mb-2">City</Label>
            <Input
              type="text"
              placeholder="Enter City"
              name="city"
              value={input.city}
              onChange={inputHandler}
            />
          </div>
          <div>
            <Label className="mb-2">Country</Label>
            <Input
              type="text"
              placeholder="Enter Country"
              name="country"
              value={input.country}
              onChange={inputHandler}
            />
          </div>
          <DialogFooter className="col-span-2">
            <Button className="bg-orange md:w-full">
              Continue to Checkout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
