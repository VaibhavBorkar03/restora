import { Loader2, LockKeyhole } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, loading } = useUserStore();
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    await resetPassword(token, newPassword);
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-lg w-full flex-col gap-4 p-6 max-w-sm text-center border border-gray-100 shadow-lg"
      >
        <div>
          <h1 className="font-extrabold text-2xl">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new Password</p>
        </div>
        <div className="relative">
          <Input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="pl-10 focus-visible:ring-2"
          />
          <LockKeyhole className="absolute inset-y-1 left-2" />
        </div>
        <div>
          {loading ? (
            <Button
              type="submit"
              className="bg-orange w-full hover:bg-hoverOrange"
            >
              <Loader2 className="animate-spin h-2" /> Please wait...
            </Button>
          ) : (
            <Button className="bg-orange w-full hover:bg-hoverOrange h-8">
              Reset Password
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
