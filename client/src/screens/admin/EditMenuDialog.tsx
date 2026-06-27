import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuFormState, menuSchema } from "@/schema/menuSchema";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const EditMenuDialog = ({
  editMenuOpen,
  setEditMenuOpen,
  selectedMenu,
}: {
  editMenuOpen: boolean;
  setEditMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectedMenu: any;
}) => {
  const [input, setInput] = useState<menuFormState>({
    name: "",
    description: "",
    price: 0,
    image: null,
  });

  const [errors, setErrors] = useState<Partial<menuFormState>>();

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: selectedMenu?.image || undefined,
    });
  }, [selectedMenu]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<menuFormState>);
      return;
    }
    console.log(input);
  };

  return (
    <Dialog open={editMenuOpen} onOpenChange={setEditMenuOpen}>
      <DialogContent className="bg-white">
        <DialogHeader className="items-center">
          <DialogTitle className="font-bold text-xl">
            Edit Menu Item
          </DialogTitle>
          <DialogDescription>
            Edit Menu item based current market demand
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-2">
          <div>
            <Label className="mb-1">Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={inputHandler}
              placeholder="Enter Menu Name"
            />
            {errors && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.name}
              </span>
            )}
          </div>
          <div>
            <Label className="mb-1">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={inputHandler}
              placeholder="Enter Description"
            />
            {errors && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.description}
              </span>
            )}
          </div>
          <div>
            <Label className="mb-1">Price</Label>
            <Input
              type="number"
              name="price"
              value={input.price}
              onChange={inputHandler}
              placeholder="Enter Price"
            />
            {errors && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.price}
              </span>
            )}
          </div>
          <div>
            <Label className="mb-1">Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setInput({
                  ...input,
                  image: e.target.files?.[0] || null,
                })
              }
            />
            {errors && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.image?.name || "Image is required"}
              </span>
            )}
          </div>
          <DialogFooter>
            <Button className="bg-orange">Edit Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
