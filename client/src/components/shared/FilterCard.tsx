import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type FilterTypeState = {
  id: string;
  label: string;
};

const filterdOption: FilterTypeState[] = [
  { id: "biryani", label: "biryani" },
  { id: "tandoor", label: "tandoor" },
  { id: "tandoor", label: "tandoor" },
  { id: "tandoor", label: "tandoor" },
];
export const FilterCard = () => {
  return (
    <div className="md:w-72">
      <div className=" flex justify-between items-center">
        <h1 className="font-medium text-lg">Filter by cousins</h1>
        <Button className="bg-orange">Reset</Button>
      </div>
      {filterdOption.map((option) => (
        <div key={option.id} className="flex items-center my-2 space-x-2 mx-4 md:mx-0">
          <Checkbox id={option.id} />
          <Label className="text-sm font-medium leading-none ">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
