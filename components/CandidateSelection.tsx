"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Voter = {
  name: string;
  NID: string;
  constituency: string;
  hasVoted: boolean;
};

type Constituency = {
  constituencyName: string;
  division: string;
  totalVotes: number;
  parties: {
    partyName: string;
    logoUrl: string;
    candidateId: number;
    candidateName: string;
    candidateImage: string;
    votes: number;
  }[];
};

type CandidateSelectionProps = {
  voter: Voter;
  constituency: Constituency;
};

const CandidateSelection = ({
  voter,
  constituency,
}: CandidateSelectionProps) => {
  const handleVote = async (candidateId: number) => {
    const response = await fetch("/api/confirmVote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidateId,
        constituencyName: constituency.constituencyName,
        NID: voter.NID,
      }),
    });

    if (response.status === 200) {
      alert("You have successfully cast your vote!");
    } else {
      alert("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 w-full max-w-5xl mx-auto">
      {constituency.parties.map((party, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-center items-center gap-5">
              <Avatar className="rounded-full">
                <AvatarImage src={party.logoUrl} alt={party.partyName} />
              </Avatar>
              <Avatar className="rounded-full">
                <AvatarImage
                  src={party.candidateImage}
                  alt={party.candidateName}
                />
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle>{party.candidateName}</CardTitle>
            <CardDescription>{party.partyName}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button
              onClick={() => handleVote(party.candidateId)}
              size={"lg"}
              className="w-1/3"
            >
              Vote
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CandidateSelection;
