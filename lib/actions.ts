"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyJwtToken } from "./auth";
import prisma from "@/lib/prisma";

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

export const getElections = async () => {
  const elections = await prisma.election.findMany();
  return elections;
};

export const generateId = () => {
  return "id" + Math.random().toString(16).slice(2);
};

export const addConstituency = async (name: string) => {
  try {
    const constituency = await prisma.constituency.findUnique({
      where: {
        name,
      },
    });
    if (constituency) {
      return {
        status: "error",
        message: "Constituency already exists",
      };
    }
    await prisma.constituency.create({
      data: {
        name,
        id: generateId(),
        votes: 0,
      },
    });

    revalidatePath("/admin");
    return {
      status: "success",
      message: "Constituency added successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred",
      data: null,
    };
  }
};

export const getConstituencies = async () => {
  const constituencies = await prisma.constituency.findMany({
    include: {
      candidates: true,
    },
  });
  return constituencies;
};

export const addCandidate = async (
  name: string,
  party: string,
  image: string,
  constituencyId: string,
  partyLogo: string
) => {
  try {
    const candidate = await prisma.candidate.findFirst({
      where: {
        party,
        belongingConstituencyId: constituencyId,
      },
    });
    if (candidate) {
      return {
        status: "error",
        message: "Candidate already exists",
      };
    }
    await prisma.candidate.create({
      data: {
        name,
        party,
        image,
        id: generateId(),
        votes: 0,
        belongingConstituencyId: constituencyId,
        partyLogo,
      },
    });

    revalidatePath("/admin");
    return {
      status: "success",
      message: "Candidate added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An error occurred",
      data: null,
    };
  }
};
