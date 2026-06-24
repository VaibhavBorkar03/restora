import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export const AvailableMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-3 gap-4 my-4 ">
      {[1, 2, 3].map((idx: number) => (
        <Card className="shadow-lg border border-none" key={idx}>
          <img
            src="https://static.toiimg.com/thumb/msid-124052036,imgsize-64098,width-400,resizemode-4/idlis-global-roots-how-an-indonesian-dish-shaped-south-indias-breakfast-staple.jpg"
            alt="dosa"
            className="object-cover w-full h-full"
          />
          <CardContent className="p-2 space-y-1">
            <h1 className="font-bold text-2xl">Tandoori Biryani</h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quam
              quasi at illo nulla
            </p>
            <h2 className="font-bold text-xl">
              Price : <span className="text-orange">80</span>
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
