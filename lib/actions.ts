"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyJwtToken } from "./auth";
import prisma from "@/lib/prisma";
import { ethers } from "ethers";
import { promises as fs } from "fs";

const NODE_ENDPOINT = "http://127.0.0.1:8545";
const provider = new ethers.JsonRpcProvider(NODE_ENDPOINT);

const USER_PRIVATE_KEY =
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

const signer = new ethers.Wallet(USER_PRIVATE_KEY, provider);

const userAddress = signer.address;

export async function revalidate() {
  revalidatePath("/");
}

export const getMyConstituency = async (constituency: string) => {
  const myConstituency = await prisma.constituency.findUnique({
    where: {
      name: constituency,
    },
    include: {
      candidates: true,
    },
  });
  return myConstituency;
};

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
    const newConstituencyId = generateId();

    const contractAddress = await getContractAddress();
    const contractABI = await getABI();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.addConstituency(
      newConstituencyId,
      name
    );
    await tx.wait();

    await prisma.constituency.create({
      data: {
        name,
        id: newConstituencyId,
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

    const newConstituencyId = generateId();

    const contractAddress = await getContractAddress();
    const contractABI = await getABI();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.addCandidate(
      constituencyId,
      newConstituencyId,
      name,
      party,
      image
    );
    await tx.wait();

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

export const interactWithContract = async () => {
  const contractAddress = await getContractAddress();

  const contractABI = await getABI();

  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(signer);
  try {
    const tx = await contractWithSigner.addConstituency("2", "Dhaka");
    await tx.wait();
    console.log("Constituency addedd successfully");
    return {
      status: "success",
      message: "Constituency addedd successfully",
      data: tx,
    };
  } catch (error) {
    console.error("Error adding constituency:", error);
    return {
      status: "error",
      message: "Error adding constituency",
      data: null,
    };
  }
};

export const fetchFromContract = async () => {
  const contractAddress = await getContractAddress();
  const contractABI = await getABI();

  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(signer);

  try {
    const tx = await contractWithSigner.getConstituency();

    console.log("Found successfully:", tx);
    return {
      status: "success",
      message: "Stored successfully",
      data: tx,
    };
  } catch (error) {
    console.error("Error from actions:", error);
    return {
      status: "error",
      message: "An error occurred",
      data: null,
    };
  }
};

export const makeVote = async (
  candidateId: string,
  constituencyId: string,
  userKey: string
) => {
  const voteSigner = new ethers.Wallet(userKey, provider);

  const contractAddress = await getContractAddress();
  const contractABI = await getABI();

  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(voteSigner);

  try {
    const tx = await contractWithSigner.vote(constituencyId, candidateId);
    await tx.wait();
    return {
      status: "success",
      message: "Voted successfully",
      data: tx,
    };
  } catch (error) {
    console.error("Error from actions:", error);
    return {
      status: "error",
      message: "An error occurred",
      data: null,
    };
  }
};

const getABI = async () => {
  const contractABI = await fs.readFile(
    process.cwd() + "/blockchain/SecureBallot.json",
    "utf8"
  );
  return contractABI;
};

const getContractAddress = async () => {
  const address = await fs.readFile(
    process.cwd() + "/blockchain/contractAddress.txt",
    "utf8"
  );
  return address;
};
