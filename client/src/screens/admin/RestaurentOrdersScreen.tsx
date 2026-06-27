import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RestaurentOrdersScreen = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-bold text-2xl my-2">Orders Overview</h1>
      <div className=" flex flex-col md:flex-row border border-gray-100 shadow-lg rounded-lg mx-4">
        <div className="p-2">
          <div className="">
            <h1 className="font-bold text-lg">RestOra</h1>
            <p className="font-bold text-sm text-gray-600">
              Address : Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h2 className="font-bold text-md text-gray-600">
              Total Amount : <span className="text-orange">80</span>
            </h2>
          </div>
          <div className="w-full sm:w-1/3">
            <Label className="font-semibold text-sm py-2">Orders status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {[
                    "Confirmed",
                    "Pending",
                    "Delivered",
                    "Preparing",
                    "OutForDelivery",
                  ].map((status: string, idx: number) => (
                    <SelectItem
                      className=""
                      key={idx}
                      value={status.toLowerCase()}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurentOrdersScreen;
