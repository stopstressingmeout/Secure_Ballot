import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey } from "@/lib/auth";
import { decrypt, hashedKey } from "@/lib/encryption";
import prisma from "@/lib/prisma";

const NID_AUTH_SESSION_TTL = 60 * 60;

export const POST = async (req: NextRequest) => {
  const cookie = cookies().get("NID_OTP_SESSION");

  if (!cookie) {
    return NextResponse.json({ message: "OTP has expired!" }, { status: 400 });
  }

  const cookieData = JSON.parse(cookie?.value);

  const body = await req.json();

  if (!body.otp) {
    return NextResponse.json({ message: "Invalid input!" }, { status: 400 });
  }

  const otp = (await redis.get(
    hashedKey(cookieData.NID, cookieData.secret)
  )) as string;

  if (!otp) {
    return NextResponse.json(
      { message: "Invalid NID number!" },
      { status: 400 }
    );
  }

  const decryptedOtp = decrypt(otp, cookieData.secret);

  if (decryptedOtp != body.otp.toString()) {
    return NextResponse.json({ message: "Invalid OTP!" }, { status: 400 });
  }

  const existingVoter = await prisma.decentralizedVoter.findUnique({
    where: {
      NID: cookieData.NID,
    },
  });

  if (!existingVoter) {
    await prisma.decentralizedVoter.create({
      data: {
        NID: cookieData.NID,
        name: cookieData.name,
        constituency: cookieData.constituency,
        hasVoted: false,
      },
    });
  }

  await redis.del(cookieData.NID);

  cookies().delete("NID_OTP_SESSION");

  const token = await new SignJWT({ sub: cookieData.NID })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(getJwtSecretKey());

  cookies().set("NID_AUTH_SESSION", token, {
    httpOnly: true,
    path: "/",
    maxAge: NID_AUTH_SESSION_TTL,
  });

  return NextResponse.json({ message: "OTP verified!" }, { status: 200 });
};
