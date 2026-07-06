import { Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignUpInputState, signUpSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

export default function SignUp() {
  //   type SignUpInputState = {
  //     fullname: string;
  //     email: string;
  //     password: string;
  //     contact: string;
  //   };

  const [input, setInput] = useState<SignUpInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const [error, setError] = useState<Partial<SignUpInputState>>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = signUpSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(fieldErrors as Partial<SignUpInputState>);
      return;
    }

    // console.log(input);
    const success = await signup(input);
    if (success) {
      navigate("/verify-email");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight 
               text-gray-900 mb-4 text-center"
        >
          Rest
          <span className=" text-orange font-extrabold">Ora</span>
        </h2>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullname"
          >
            Fullname
          </Label>
          <div className="relative">
            <Input
              className="pl-10 focus-visible:ring-2 "
              type="text"
              name="fullname"
              placeholder="Fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
            <User className="absolute text-gray-400  inset-y-1" />
            {error && (
              <span className="text-red-600 text-sm font-semibold">
                {error.fullname}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </Label>
          <div className="relative">
            <Input
              className="pl-10 focus-visible:ring-2 "
              name="email"
              type="email"
              placeholder="Email"
              value={input.email}
              onChange={changeEventHandler}
            />
            <Mail className="absolute text-gray-400  inset-y-1   " />
            {error && (
              <span className="text-red-600 text-sm font-semibold">
                {error.email}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </Label>

          <div className="relative">
            <Input
              className="pl-10 focus-visible:ring-2"
              name="password"
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={changeEventHandler}
            />
            <LockKeyhole className="absolute text-gray-400  inset-y-1" />
            {error && (
              <span className="text-red-600 text-sm font-semibold">
                {error.password}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contact"
          >
            Contact
          </Label>
          <div className="relative">
            <Input
              className="pl-10 focus-visible:ring-2 "
              name="contact"
              type="text"
              placeholder="Contact Number"
              value={input.contact}
              onChange={changeEventHandler}
            />
            <PhoneCall className="absolute text-gray-400  inset-y-1" />
            {error && (
              <span className="text-red-600 text-sm font-semibold">
                {error.contact}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Button
              disabled
              className="w-full bg-orange hover:bg-hoverOrange text-white font-bold py-2 px-4 rounded "
              type="submit"
            >
              <Loader2 className="h-2 animate-spin mx-2" /> please wait...
            </Button>
          ) : (
            <Button
              className="w-full  bg-orange hover:bg-hoverOrange text-white font-bold py-2 px-4 rounded "
              type="submit"
            >
              Sign Up
            </Button>
          )}
        </div>
        <Separator />
        <p className="text-center text-sm text-[#F59E0B] mt-4 font-semibold">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-medium">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
