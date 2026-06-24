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
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const CartScreen = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <Button variant={"link"}>Clear All</Button>
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
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>Biryani</TableCell>
              <TableCell>130</TableCell>
              <TableCell>
                <div className="flex items-center w-fit border border-gray-400 rounded-full shadow-md">
                  <Button
                    variant={"outline"}
                    className="bg-gray-400 rounded-full hover:bg-slate-700"
                  >
                    <Minus size="icon" className="rounded-full" />
                  </Button>
                  <Button variant={"outline"} disabled>
                    1
                  </Button>
                  <Button
                    variant={"outline"}
                    className="bg-orange rounded-full hover:bg-hoverOrange"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>130</TableCell>
              <TableCell className="text-right">
                <Button className="bg-orange text-sm hover:bg-hoverOrange">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="text-xl font-bold">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">130</TableCell>
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
