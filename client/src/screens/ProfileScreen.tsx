import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Globe, Loader2, Mail, MapPin, Plus } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";

export const ProfileScreen = () => {
  const loading = false;

  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const [currentProfile, setCurrentProfile] = useState<string>(
    profileData.profilePicture,
  );

  const imageRef = useRef<HTMLInputElement | null>(null);
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCurrentProfile(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profileData);
  };

  return (
    <form onSubmit={updateHandler} className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 my-8">
          <Avatar className="relative">
            <AvatarImage src={currentProfile}></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
            <Input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100"
            >
              <Plus className="w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="fullname"
            onChange={inputHandler}
            value={profileData.fullname}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="flex items-center gap-4 rounded-lg p-2 bg-gray-200">
          <Mail />
          <div className="w-full ">
            <Label>Email</Label>
            <Input
              name="email"
              value={profileData.email}
              onChange={inputHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg p-2 bg-gray-200">
          <MapPin />
          <div className="w-full">
            <Label>Address</Label>
            <Input
              name="address"
              value={profileData.address}
              onChange={inputHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg p-2 bg-gray-200">
          <Building />
          <div className="w-full">
            <Label>City</Label>
            <Input
              name="city"
              value={profileData.city}
              onChange={inputHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg p-2 bg-gray-200">
          <Globe />
          <div className="w-full">
            <Label>Country</Label>
            <Input
              name="country"
              value={profileData.country}
              onChange={inputHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-4 w-full">
        {loading ? (
          <Button>
            <Loader2 className="animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit" className="bg-orange hover:bg-hoverOrange">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};
