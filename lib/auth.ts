import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT secret key is not defined!");
  }
  const encodedSecret = new TextEncoder().encode(secret);
  console.log("Encoded secret: ", encodedSecret);

  return encodedSecret;
}

export async function verifyJwtToken(token: any) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}