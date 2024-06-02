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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useFormatter, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Voter = {
  name: string;
  NID: string;
  constituency: string;
  hasVoted: boolean;
};

type Constituency = {
  id: string;
  name: string;
  votes: number;
  candidates: {
    party: string;
    partyLogo: string;
    id: string;
    name: string;
    image: string;
    votes: number;
  }[];
};

type CandidateSelectionProps = {
  voter: Voter;
  constituency: Constituency;
};

type ConfirmVote = {
  candidateId: string;
  constituencyName: string;
  candidateName: string;
  candidateImage: string;
  candidateParty: string;
  constituencyId: string;
};

const CandidateSelection = ({
  voter,
  constituency,
}: CandidateSelectionProps) => {
  const router = useRouter();
  console.log(voter, constituency);

  const t = useTranslations("CandidateSelection");
  const { toast } = useToast();

  const [selectedCandidate, setSelectedCandidate] =
    useState<ConfirmVote | null>(null);

  const [voting, setVoting] = useState<boolean>(false);

  const handleVote = async (candidateId: ConfirmVote | null) => {
    if (candidateId === null) {
      toast({
        title: t("toast_message"),
        variant: "destructive",
      });
      return;
    }
    setVoting(true);
    const response = await fetch("/api/confirmVote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidateId,
        constituencyName: constituency.name,
        NID: voter.NID,
        constituencyId: constituency.id,
      }),
    });

    if (response.status === 200) {
      setVoting(false);
      router.refresh();
    } else {
      setVoting(false);
      alert("Something went wrong! Please try again.");
    }
  };

  if (voting) {
    return <div className="text-center text-3xl animate-pulse">loading...</div>;
  }
  return (
    <AlertDialog>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 w-full max-w-5xl mx-auto">
        <AlertDialogContent className="flex flex-col justify-center items-center gap-4 text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {t("vote_confirm")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <CardHeader>
                <div className="flex justify-center items-center gap-5">
                  <Avatar className="rounded-full">
                    <AvatarImage
                      src={selectedCandidate?.candidateImage}
                      alt={selectedCandidate?.candidateImage}
                    />
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle>{selectedCandidate?.candidateName}</CardTitle>
                <CardDescription>
                  {selectedCandidate?.candidateParty}
                </CardDescription>
              </CardContent>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleVote(selectedCandidate)}>
              {t("confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

        {constituency.candidates.map((party, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-center items-center gap-5">
                <Avatar className="rounded-full">
                  <AvatarImage src={party.partyLogo} alt={party.party} />
                </Avatar>
                <Avatar className="rounded-full">
                  <AvatarImage src={party.image} alt={party.name} />
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{party.name}</CardTitle>
              <CardDescription>{party.party}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCandidate({
                      candidateId: party.id,
                      constituencyName: constituency.name,
                      candidateName: party.name,
                      candidateImage: party.image,
                      candidateParty: party.party,
                      constituencyId: constituency.id,
                    });
                  }}
                >
                  {t("vote")}
                </Button>
              </AlertDialogTrigger>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AlertDialog>
  );
};

export default CandidateSelection;
