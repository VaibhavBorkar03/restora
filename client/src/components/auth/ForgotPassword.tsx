import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";

export const ForgotPassword = () => {
  const loading = false;
  const [email, setEmail] = useState<string>("");
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex rounded-lg w-full flex-col gap-4 md:p-8 max-w-md text-center border border-gray-100 shadow-lg">
        <div>
          <h1 className="font-extrabold text-2xl ">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset password
          </p>
        </div>
        <div className="relative">
          <Input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="pl-10 focus-visible:ring-2"
          />
          <Mail className="absolute inset-y-1 left-2" />
        </div>
        <div>
          {loading ? (
            <Button type="submit" className="w-full bg-orange h-8">
              <Loader2 className="animate-spin h-3" /> Please wait..
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange h-8 hover:bg-hoverOrange"
            >
              Send Reset Link
            </Button>
          )}
        </div>
        <span className="text-sm ">
          Back to{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
