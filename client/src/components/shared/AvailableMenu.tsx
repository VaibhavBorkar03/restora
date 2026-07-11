import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { MenuItem } from "@/types/restaurentTypes";

export const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-3 gap-4 my-4 ">
      {menus?.map((menu: any, idx: number) => (
        <Card className="shadow-lg border border-none" key={idx}>
          <img
            src={menu?.image}
            alt="dosa"
            className="object-cover w-full h-full"
          />
          <CardContent className="p-2 space-y-1">
            <h1 className="font-bold text-2xl">{menu?.name}</h1>
            <p className="text-gray-500">{menu?.description}</p>
            <h2 className="font-bold text-xl">
              Price : <span className="text-orange">{menu.price}</span>
            </h2>
          </CardContent>
          <CardFooter className="p-4">
            <Button
              onClick={() => navigate(`/cart`)}
              className="bg-orange w-full hover:bg-hoverOrange"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
