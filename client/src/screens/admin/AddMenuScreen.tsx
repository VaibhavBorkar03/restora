import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { EditMenuDialog } from "./EditMenuDialog";
import { menuFormState, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurentStore } from "@/store/useRestaurentStore";

// const menus = [
//   {
//     name: "chicken tikka",
//     description: "chicken tiika is a superb indian dish",
//     price: 120,
//     image:
//       "https://cdn.britannica.com/40/177340-050-2F922898/Chicken-tikka-masala.jpg",
//   },

//   {
//     name: "biryani",
//     description: "biryani is a superb indian dish",
//     price: 160,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu6ItKaZRurjdLym0LecokMuCZDOPwPSJQobty-WEP8DXCg41tfpOqbgWj&s=10",
//   },
//   {
//     name: "manchurian rice",
//     description: "manchurian rice is a superb indian dish",
//     price: 90,
//     image:
//       "https://intelligentfoods.ae/cdn/shop/files/chicken-8df7443b3619054bfff7d3f4cb8d30b7.jpg?v=1715942239&width=1020",
//   },
// ];

export const AddMenuScreen = () => {
  const [input, setInput] = useState<menuFormState>({
    name: "",
    description: "",
    price: 0,
    image: null,
  });

  const { addMenu } = useMenuStore();
  const restaurent = useRestaurentStore((state) => state.restaurent);
  

  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [errors, setErrors] = useState<Partial<menuFormState>>();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<menuFormState>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      formData.append("image", input.image);

      await addMenu(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:max-w-6xl md:my-2">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Available Menu</h1>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-orange">AddMenu</Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader className="items-center">
                  <DialogTitle className="font-bold text-xl">
                    Add New Menu
                  </DialogTitle>
                  <DialogDescription>
                    Create menu that make your restaurent popular
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
                    {errors?.name && (
                      <span className="text-sm text-red-500 font-semibold">
                        {errors.name[0]}
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
                    {errors?.description && (
                      <span className="text-sm text-red-500 font-semibold">
                        {errors.description[0]}
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
                          image: e.target.files?.[0],
                        })
                      }
                    />
                    {errors && (
                      <span className="text-sm text-red-500 font-semibold">
                        {errors.image?.name}
                      </span>
                    )}
                  </div>
                  <DialogFooter>
                    <Button className="bg-orange">Add Menu</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 p-1 py-4">
          {restaurent?.menus?.map((menu: any, idx: number) => (
            <div key={idx}>
              <div className="shadow-md rounded-lg ">
                <img
                  src={menu?.image}
                  alt=""
                  className="object-cover w-full h-32 p-1 rounded-lg"
                />
                <div className="px-2 py-1">
                  <h1 className="font-bold text-lg">{menu.name}</h1>
                  <p className="text-sm text-gray-700">{menu.description}</p>
                  <h3 className="font-semibold">
                    Price :{" "}
                    <span className="text-orange font-semibold">
                      {menu.price}
                    </span>
                  </h3>
                </div>
                <div className="p-2">
                  <Button
                    className="w-full bg-orange"
                    onClick={() => {
                      setEditMenuOpen(true);
                      setSelectedMenu(menu);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditMenuDialog
        editMenuOpen={editMenuOpen}
        setEditMenuOpen={setEditMenuOpen}
        selectedMenu={selectedMenu}
      />
    </div>
  );
};
