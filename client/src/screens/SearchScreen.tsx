import { FilterCard } from "@/components/shared/FilterCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, MapPin, X } from "lucide-react";
import burder from "@/assets/burger.jpg";
import { Link } from "react-router-dom";

const appliedFilter = ["biryani", "tandoori", "pulavo"];

function SearchScreen() {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex flex-col  md:flex-row justify-between gap-7">
        {/* filter */}
        <div >
          <FilterCard />
        </div>
        {/* food items */}
        <div className="my-2 flex-1">
          <div className="flex gap-2">
            <Input type="text" placeholder="Search by city , food ...." />
            <Button className="bg-orange">Search</Button>
          </div>
          <div className="font-bold text-2xl my-3">
            <h1>(2) Search result found</h1>
          </div>
          <div className="relative flex gap-2">
            {appliedFilter.map((selectedFilter: string, idx: number) => (
              <div
                key={idx}
                className="rounded-md text-white bg-gray-500 justify-center items-center hover:cursor-pointer"
              >
                <div className="flex justify-center items-center px-2 py-1">
                  <Badge>{selectedFilter}</Badge>
                  <X className="" size={16} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4 md:flex-row">
            {[1, 2, 3].map(() => (
              <Card className="bg-white shadow-lg">
                <div className="relative">
                  <AspectRatio ratio={16 / 6}>
                    <img
                      src={burder}
                      alt="burger"
                      className="w-full h-full object-cover my-2"
                    />
                  </AspectRatio>
                  <div className="absolute top-4 left-4 shadow-md font-semibold border border-gray-400 p-1 rounded-md text-xs bg-white">
                    <span>Featured</span>
                  </div>
                </div>
                <CardContent className=" p-4">
                  <h1 className="font-bold text-xl ">Pizza Hunt</h1>
                  <div className="flex gap-2 items-center ">
                    <MapPin size={16} />
                    <p>
                      City : <span> Delhi</span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <Globe size={16} />
                    <p>
                      Country : <span>India</span>
                    </p>
                  </div>
                  <div className="flex gap-3  text-white my-2">
                    {appliedFilter.map((cuisine: string, idx: number) => (
                      <div
                        key={idx}
                        className=" gap-2 rounded-md bg-gray-500 py-1"
                      >
                        <Badge>{cuisine}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-end px-4 py-2">
                  <Link to={``}>
                    <Button className="bg-orange">View Menues</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
