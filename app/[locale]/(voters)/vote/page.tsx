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

  const voter = await prisma.voter.findUnique({
    where: {
      NID: tokenIsVerified.sub,
    },
  });

  if (voter?.hasVoted) {
    return (
      <div className="text-center flex justify-center items-center h-full w-full">
        <h1 className="text-3xl my-10">
          Congratulations! Your vote has been successfully recorded!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center text-center">
      {voter && !voter.hasVoted && <CastVote voter={voter} />}
    </div>
  );
};

export default VotePage;
