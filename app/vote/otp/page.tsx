import Error from "@/components/Error";
import OtpForm from "@/components/OtpForm";
import { cookies } from "next/headers";

type Session = {
  NID: string;
  phone: string;
} | null;

const OTPPage = () => {
  const cookie = cookies().get("NID_OTP_SESSION")?.value;

  if (!cookie) {
    return <Error />;
  }

  const session = JSON.parse(cookie) as Session;

  console.log("Session: ", session);

  return (
    <div className="text-center md:w-1/2 mx-auto flex flex-col justify-center items-center">
      <OtpForm session={session} />
    </div>
  );
};

export default OTPPage;