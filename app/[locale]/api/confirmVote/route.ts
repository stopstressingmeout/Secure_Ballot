import { makeVote } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);

  const voter = await prisma.voter.findUnique({
    where: {
      NID: body.NID,
    },
  });

  if (!voter) {
    return NextResponse.json({ message: "Voter not found!" }, { status: 404 });
  }

  const updateVoter = await prisma.voter.update({
    where: {
      NID: body.NID,
    },
    data: {
      hasVoted: true,
    },
  });

  const updateConstituencyVote = await prisma.constituency.update({
    where: {
      id: body.constituencyId,
    },
    data: {
      votes: {
        increment: 1,
      },
    },
  });

  const updateCandidateVote = await prisma.candidate.update({
    where: {
      id: body.candidateId.candidateId,
    },
    data: {
      votes: {
        increment: 1,
      },
    },
  });

  const blockchainVoteResponse = await makeVote(
    body.candidateId.candidateId,
    body.constituencyId,
    voter?.privateKey
  );

  if (blockchainVoteResponse.status === "error") {
    return NextResponse.json({ message: "Error voting!" }, { status: 500 });
  }

  return NextResponse.json({ message: "Successfully voted!" }, { status: 200 });
};
