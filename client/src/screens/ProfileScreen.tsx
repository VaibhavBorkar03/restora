import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/useUserStore";
import { Building, Globe, Loader2, Mail, MapPin, Plus } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";

export const ProfileScreen = () => {
  const loading = false;
  const { user, updateProfile } = useUserStore();
  // console.log(user);

  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: null as File | null,
  });
  const [currentProfile, setCurrentProfile] = useState(
    user?.profilePicture || "",
  );

  const imageRef = useRef<HTMLInputElement | null>(null);
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setProfileData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));

    const reader = new FileReader();

    reader.onloadend = () => {
      // const result = reader.result as string;
      setCurrentProfile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", profileData.fullname);
    formData.append("city", profileData.city);
    formData.append("country", profileData.country);
    formData.append("email", profileData.email);
    formData.append("address", profileData.address);
    if (profileData.profilePicture) {
      formData.append("profilePicture", profileData.profilePicture);
    }
    await updateProfile(formData);

    // console.log(profileData);
  };

  return (
    <form onSubmit={updateHandler} className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 my-8">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
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
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer"
            >
              <Plus className="w-20 h-20" />
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
              type="email"
              disabled
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
              type="text"
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
              type="text"
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
              type="text"
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
