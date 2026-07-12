import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";

export const CheckoutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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

  const chackoutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
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
