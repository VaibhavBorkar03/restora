import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginInputState, loginSchema } from "@/schema/userSchema";

export default function Login() {
  const loading = false;

  // type LoginInputState = {
  //   email: string;
  //   password: string;
  // };

  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<Partial<LoginInputState>>({});
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log(input);
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
              <span className="font-semibold text-sm text-red-600">
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
            <LockKeyhole className="absolute text-gray-400  inset-y-1   " />
            {error && (
              <span className="font-semibold text-sm text-red-600">
                {error.password}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Button
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
              Login
            </Button>
          )}
        </div>
        <Separator />
        <div className="hover:text-blue-600 hover:underline text-sm mt-3 text-center">
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
        <p className="text-center text-sm text-[#F59E0B] mt-4 font-semibold">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="font-medium">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
