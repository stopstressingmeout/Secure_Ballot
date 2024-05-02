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

type ConfirmVote = {
  candidateId: number;
  constituencyName: string;
  candidateName: string;
  candidateImage: string;
  candidateParty: string;
};

const CandidateSelection = ({
  voter,
  constituency,
}: CandidateSelectionProps) => {
  const t = useTranslations("CandidateSelection");
  const { toast } = useToast();

  const [selectedCandidate, setSelectedCandidate] =
    useState<ConfirmVote | null>(null);

  const handleVote = async (candidateId: ConfirmVote | null) => {
    if (candidateId === null) {
      toast({
        title: t("toast_message"),
        variant: "destructive",
      });
      return;
    }
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
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCandidate({
                      candidateId: party.candidateId,
                      constituencyName: constituency.constituencyName,
                      candidateName: party.candidateName,
                      candidateImage: party.candidateImage,
                      candidateParty: party.partyName,
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
