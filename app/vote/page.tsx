import Error from "@/components/Error";
import { verifyJwtToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

const VotePage = async () => {
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

  return (
    <div className="flex flex-col justify-center">
      <h1>{`Welcome ${voter && voter.name}`}</h1>
      <h1>Vote for your candidate</h1>
    </div>
  );
};

export default VotePage;