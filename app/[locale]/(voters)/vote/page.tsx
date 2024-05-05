import CastVote from "@/components/CastVote";
import Error from "@/components/Error";
import { verifyJwtToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PageProps } from "@/lib/types";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

const VotePage = async ({ params: { locale } }: PageProps) => {
  unstable_setRequestLocale(locale);
  const authCookie = cookies().get("NID_AUTH_SESSION");
  const tokenIsVerified = await verifyJwtToken(authCookie?.value);

  if (!tokenIsVerified) {
    return <Error />;
  }

  const voter = await prisma.decentralizedVoter.findUnique({
    where: {
      NID: tokenIsVerified.sub,
    },
  });

  return (
    <div className="flex flex-col justify-center text-center">
      {voter && !voter.hasVoted && <CastVote voter={voter} />}
    </div>
  );
};

export default VotePage;
