import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
  // const loading = false;

  const navigate = useNavigate();
  const { verifyEmail, loading } = useUserStore();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (idx: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
    }

    //move to next input field
    if (value !== "" && idx < 5) {
      inputRef.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRef.current[idx - 1]?.focus();
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const verificationCode = otp.join("");

    
    const success = await verifyEmail(verificationCode);
    if (success) {
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={submitHandler}
        className="flex rounded-lg w-full flex-col gap-4 p-6 max-w-sm text-center border border-gray-100 shadow-lg"
      >
        <div>
          <h2 className="font-extrabold text-2xl">Verify Your Email</h2>
          <p className="text-sm text-gray-600">
            Enter 6 digit code that was sent on your email
          </p>
        </div>
        <div className="flex justify-between gap-5">
          {otp.map((letter: string, idx: number) => (
            <Input
              type="text"
              ref={(el) => (inputRef.current[idx] = el)}
              key={idx}
              value={letter}
              maxLength={1}
              className="w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(idx, e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleOtpKeyDown(idx, e)
              }
            />
          ))}
        </div>
        <div>
          {loading ? (
            <Button className="w-full bg-orange hover:bg-hoverOrange h-8">
              <Loader2 className="animate-spin" /> Please wait..
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange h-8"
            >
              Verify
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
