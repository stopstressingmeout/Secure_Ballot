"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyJwtToken } from "./auth";

export async function revalidate() {
  revalidatePath("/");
}

export const getCurrentVoter = async () => {
  const authCookie = cookies().get("NID_AUTH_SESSION");
  const tokenIsVerified = await verifyJwtToken(authCookie?.value);

  if (!tokenIsVerified) {
    cookies().delete("NID_AUTH_SESSION");
    return null;
  } else {
    return tokenIsVerified;
  }
};

export const logOut = async () => {
  cookies().delete("NID_AUTH_SESSION");
  cookies().delete("NID_OTP_SESSION");
  revalidatePath("/vote", "layout");
  return;
};
