import OtpForm from "@/components/OtpForm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

const OTPPage = () => {
  revalidatePath("/otp");
  const cookie = cookies().get("NID_OTP_SESSION")?.value;

  if (!cookie) {
    return (
      <div>
        <h1>OTP has expired!</h1>
        <Link href="/vote">Please try again</Link>
      </div>
    );
  }

  const session = JSON.parse(cookie);

  return (
    <div>
      <h1>{`OTP has been sent to ${session.phone}`}</h1>
      <OtpForm />
    </div>
  );
};

export default OTPPage;