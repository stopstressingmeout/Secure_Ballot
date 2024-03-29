import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

const AUTH_REQUIRED_PATHS = ["/vote"];
const OTP_REQUIRED_PATHS = ["/otp"];
const DEFAULT_PATH = "/";

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req;
  const otpCookie = cookies.get("NID_OTP_SESSION");
  const authCookie = cookies.get("NID_AUTH_SESSION");

  console.log("Session: ", otpCookie);
  console.log("Token: ", authCookie);

  if (OTP_REQUIRED_PATHS.includes(nextUrl.pathname) && !otpCookie) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (AUTH_REQUIRED_PATHS.includes(nextUrl.pathname)) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/", url));
    } else {
      const tokenIsVerified = await verifyJwtToken(authCookie.value);
      if (!tokenIsVerified) {
        const response = NextResponse.redirect(new URL("/", url));
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