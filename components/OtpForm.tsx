"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next-nprogress-bar";

import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

type Session = {
  NID: string;
  phone: string;
} | null;



const OtpForm = ({ session }: { session: Session }) => {
  const t = useTranslations("Otp");

  const formatter = useFormatter();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/validateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: input }),
      });

      const data = await res.json();

      if (res.status == 200) {
        router.push("/vote");
      } else {
        toast({
          title: data.message,
          variant: "destructive",
        });
        if (data.message === "OTP has expired!") {
          router.push("//vote/verification");
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-col items-center space-y-1">
        <CardTitle className="uppercase">{t("title")}</CardTitle>
        <CardDescription>
          {t("description1")}{session?.phone}{t("description2")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Input
            className="font-mono"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="••••••"
            required
          />
        </div>
        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("wait")}
          </Button>
        ) : (
          <Button className="w-full" onClick={handleOTP}>
            {t("verify_otp")}
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <Alert className="text-sm text-center">
          {t("alert")}
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default OtpForm;