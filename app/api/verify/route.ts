import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  NID: z.string().length(10, "NID number is invalid!"),
  name: z.string().min(1, "Name cannot be empty!").max(50),
  father: z.string().min(1, "Name cannot be empty!").max(50),
  mother: z.string().min(1, "Name cannot be empty!").max(50),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

const NID_OTP_SESSION_TTL = 600;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const formattedData = {
    ...body,
    dob: new Date(body.dob),
  };

  const result = formSchema.safeParse(formattedData);

  if (!result.success) {
    return NextResponse.json({ message: "Invalid input!" }, { status: 400 });
  }

  const voter = await prisma.voter.findUnique({
    where: {
      NID: result.data.NID,
      name: result.data.name,
      father: result.data.father,
      mother: result.data.mother,
      dob: result.data.dob,
    },
  });

  if (!voter) {
    return NextResponse.json(
      { message: "Incorrect information. Voter not found!" },
      { status: 400 }
    );
  }

  const otp = Math.floor(Math.random() * 1000);

  const hiddenPhone = voter.phone.replace(/(\d{3})\d*(\d{2})/, "$1******$2");

  await redis.set(voter.NID, otp, { ex: NID_OTP_SESSION_TTL });

  cookies().delete("NID_AUTH_SESSION");

  cookies().set(
    "NID_OTP_SESSION",
    JSON.stringify({
      NID: result.data.NID,
      phone: hiddenPhone,
      otp,
    }),
    {
      expires: new Date(Date.now() + NID_OTP_SESSION_TTL * 1000),

      httpOnly: true,
    }
  );

  return NextResponse.json({ message: "OTP has been sent!" }, { status: 200 });
}