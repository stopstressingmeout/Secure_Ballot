import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
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

const NID_OTP_SESSION_TTL = 60;

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

  console.log("Voter: ", voter);

  if (!voter) {
    return NextResponse.json({ message: "Voter not found!" }, { status: 400 });
  }

  /*
 browser cookie => NID_OTP_SESSION : {NID: result.data.NID,phone:********##, TTL: 60}

 broweser redirect to otp verification page, browser will check if the cookie is present, if not, redirect to the form page

 redis => NID:OTP
  */

  const otp = Math.floor(Math.random() * 1000);

  const hiddenPhone = voter.phone.replace(/(\d{3})\d*(\d{2})/, "$1******$2");

  await redis.set(voter.NID, otp, { ex: NID_OTP_SESSION_TTL });

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

  revalidatePath("/otp");

  return NextResponse.json({ message: "OTP has been sent!" }, { status: 200 });
}