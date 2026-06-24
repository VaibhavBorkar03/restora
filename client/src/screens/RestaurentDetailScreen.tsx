import { AvailableMenu } from "@/components/shared/AvailableMenu";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";

export const RestaurentDetailScreen = () => {
  return (
    <div className="max-w-7xl mx-auto my-8">
      <div className="w-full ">
        <div className="w-full h-32 my-2 md:h-52">
          <img
            src="https://static.toiimg.com/thumb/msid-124052036,imgsize-64098,width-400,resizemode-4/idlis-global-roots-how-an-indonesian-dish-shaped-south-indias-breakfast-staple.jpg"
            alt="dosa"
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold ">Tandoori Tadka</h2>
          <div className="flex gap-2 ">
            {["biryani", "mutton"].map((item: string, idx: number) => (
              <div key={idx} className="">
                <Badge className="bg-gray-700 rounded-lg p-2 text-white ">
                  {item}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 my-4 items-center">
          <Timer />
          <h1 className="font-semibold text-lg">
            Delivery Time : <span className="text-gray-500">35 mins</span>
          </h1>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Available Menus</h2>
          <AvailableMenu />
        </div>
      </div>
    </div>
  );
};
