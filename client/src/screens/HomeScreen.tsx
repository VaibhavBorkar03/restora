import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import HeroImage from "@/assets/burger.jpg";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:p-10 items-center justify-center mt-6">
      <div className="flex flex-col gap-4 md:w-[40%]m-4 md:gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Order Food from anywhere
          </h1>
          <p className="text-gray-400 text-lg ">
            Hey! Where are you looking? Here is delicious food
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search city, food and Restaurent"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 w-full shadow-md"
          />
          <Search className="absolute inset-y-2 left-2" />
          <Button className="bg-orange hover:bg-hoverOrange h-9">Search</Button>
        </div>
      </div>
      <div>
        <img
          src={HeroImage}
          alt="burger"
          className="object-cover w-full max-h-[500px] mt-6 "
        />
      </div>
    </div>
  );
};

export default HomeScreen;
