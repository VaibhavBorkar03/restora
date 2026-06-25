import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurenInputState,
  restaurentSchema,
} from "@/schema/restaurentSchema";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";

export const RestaurentScreen = () => {
  const restaurent = false;
  const loading = false;

  const [errors, setErrors] = useState<Partial<restaurenInputState>>({});
  const [input, setInput] = useState<restaurenInputState>({
    restaurentName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurentSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<restaurenInputState>);
      return;
    }
    console.log(input);
  };
  return (
    <div className="max-w-7xl mx-auto md:max-w-5xl">
      <div className="flex flex-col">
        <div className="my-2">
          <h1 className="font-bold text-2xl md:mt-8">Add Restaurants</h1>
        </div>
        <div className="flex flex-col my-3">
          <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Restaurent Name</Label>
              <Input
                type="text"
                name="restaurentName"
                value={input.restaurentName}
                onChange={inputHandler}
                placeholder="Enter Restaurnet Name"
              />
              {errors && (
                <span className="font-semibold text-sm text-red-600">
                  {errors.restaurentName}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={input.city}
                onChange={inputHandler}
                placeholder="Enter City"
              />
              {errors && (
                <span className="font-semibold text-sm text-red-600">
                  {" "}
                  {errors.city}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={inputHandler}
                placeholder="Enter Country"
              />
              {errors && (
                <span className="font-semibold text-sm text-red-600">
                  {errors.country}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>Delivery Time</Label>
              <Input
                type="number"
                name="deliveryTime"
                value={input.deliveryTime}
                onChange={inputHandler}
                placeholder="Enter Delivert time"
              />
              {errors && (
                <span className="font-semibold text-sm text-red-600">
                  {errors.deliveryTime}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>Cuisines</Label>
              <Input
                type="number"
                name="cuisines"
                value={input.cuisines}
                onChange={(e) =>
                  setInput({ ...input, cuisines: e.target.value.split(",") })
                }
                placeholder="eg. Momos, Biryani"
              />
              {errors && (
                <span className="font-semibold text-sm text-red-600">
                  {errors.cuisines}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>Upload Restaurent Image</Label>
              <Input
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={(e) =>
                  setInput({
                    ...input,
                    imageFile: e.target.files?.[0] || undefined,
                  })
                }
              />
              {errors && (
                <span className="font-semibold text-sm text-red-600">
                  {errors.imageFile?.name}
                </span>
              )}
            </div>
            <div className="mt-2">
              {loading ? (
                <Button disabled className="bg-orange">
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              ) : restaurent ? (
                <Button className="bg-orange">Update Restaurent Details</Button>
              ) : (
                <Button className="bg-orange">Add your Restaurent</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
