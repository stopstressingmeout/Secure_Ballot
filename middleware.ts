import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";
import { revalidatePath } from "next/cache";
import { revalidate } from "./lib/actions";

const AUTH_REQUIRED_PATHS = ["/vote"];
const OTP_REQUIRED_PATHS = ["/vote/otp"];
const DEFAULT_PATH = "/";
const VERIFICATION_PATH = "/vote/verification";
const VOTE_PATH = "/vote";
const OTP_PATH = "/vote/otp";

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req;
  const otpCookie = cookies.get("NID_OTP_SESSION");
  const authCookie = cookies.get("NID_AUTH_SESSION");


  

  if (nextUrl.pathname == VERIFICATION_PATH && authCookie) {
    return NextResponse.redirect(new URL(VOTE_PATH, url));
  }

  if (OTP_PATH == nextUrl.pathname && !otpCookie) {
    return NextResponse.redirect(new URL(VOTE_PATH, url));
  }

  if (VOTE_PATH == nextUrl.pathname) {
    if (!authCookie) {
      return NextResponse.redirect(new URL(VERIFICATION_PATH, url), {});
    } else {
      const tokenIsVerified = await verifyJwtToken(authCookie.value);

      if (!tokenIsVerified) {
        const response = NextResponse.redirect(new URL(VERIFICATION_PATH, url));
        response.cookies.delete("NID_AUTH_SESSION");
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};