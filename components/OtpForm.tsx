"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OtpForm = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const handleOTP = async () => {
    try {
      const res = await fetch("/api/validateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: input }),
      });

      if (res.status == 200) {
        router.push("/vote");
      }

      const data = await res.json();

      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form action={handleOTP}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Verify</Button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default OtpForm;
