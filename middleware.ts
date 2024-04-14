import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";
import { match } from "@formatjs/intl-localematcher";
import createIntlMiddleware from "next-intl/middleware";

import Negotiator from "negotiator";
import { locales } from "./navigation";

const AUTH_REQUIRED_PATHS = ["/vote"];
const OTP_REQUIRED_PATHS = ["/vote/otp"];
const DEFAULT_PATH = "/";
const VERIFICATION_PATH = "/vote/verification";
const VOTE_PATH = "/vote";
const OTP_PATH = "/vote/otp";

let defaultLocale = "en";

function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const lang = pathname.split("/")[1];

  const pathWithoutLocale = pathname.replace(`/${lang}`, "");

  const reqCookie = req.cookies.get("LOCALE");

  console.log("reqCookie: ", reqCookie?.value);
  console.log("Lang: ", lang);

  if (pathnameIsMissingLocale) {
    if (!reqCookie?.value) {
      req.cookies.set("LOCALE", defaultLocale);
      const response = NextResponse.redirect(
        new URL(`/${defaultLocale}/${pathname}`, req.url)
      );

      response.cookies.set("LOCALE", defaultLocale);

      return response;
    }

    let locale = reqCookie.value;

    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url));
  }

  if (lang !== reqCookie?.value) {
    const response = NextResponse.redirect(
      new URL(`/${lang}/${pathWithoutLocale}`, req.url)
    );

    response.cookies.set("LOCALE", lang);

    return response;
  }

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

export default createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
