"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import CandidateSelection from "./CandidateSelection";
import { Vote } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { getMyConstituency } from "@/lib/actions";
import { useEffect, useState } from "react";

type Voter = {
  name: string;
  NID: string;
  constituency: string;
  hasVoted: boolean;
};

const mockData = [
  {
    constituencyName: "Dhaka North",
    division: "Dhaka",
    totalVotes: 26500,
    parties: [
      {
        partyName: "Awami League",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 123456,
        candidateName: "Md. Hasanul Haq Inu",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 15000,
      },
      {
        partyName: "Bangladesh Nationalist Party (BNP)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 345678,
        candidateName: "Mirza Fakhrul Islam Alamgir",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 10000,
      },
      {
        partyName: "Jatiyo Samajtantrik Dal (JSD)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 789012,
        candidateName: "Tanjim Ahmed Sohel Taj",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 1000,
      },
      {
        partyName: "Workers Party of Bangladesh",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 890123,
        candidateName: "Rashed Khan Menon",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 500,
      },
    ],
  },
  {
    constituencyName: "Chattogram South",
    division: "Chattogram",
    totalVotes: 50000,
    parties: [
      {
        partyName: "Jatiya Party (Ershad)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 456789,
        candidateName: "Zahid Ahsan Russell",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 25000,
      },
      {
        partyName: "Bangladesh Islami Front",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 678901,
        candidateName: "Muhammad Faizul Islam",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 15000,
      },

      {
        partyName: "Jatiyo Samajtantrik Dal (JSD)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 789012,
        candidateName: "Tanjim Ahmed Sohel Taj",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 5000,
      },
      {
        partyName: "Workers Party of Bangladesh",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 890123,
        candidateName: "Rashed Khan Menon",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 5000,
      },
    ],
  },
  {
    constituencyName: "Chattogram Central",
    division: "Chattogram",
    totalVotes: 70000,
    parties: [
      {
        partyName: "Awami League",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 123456,
        candidateName: "Md. Hasanul Haq Inu",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 20000,
      },
      {
        partyName: "Bangladesh Nationalist Party (BNP)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 345678,
        candidateName: "Mirza Fakhrul Islam Alamgir",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 15000,
      },
      {
        partyName: "Jatiya Party (Ershad)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 456789,
        candidateName: "Zahid Ahsan Russell",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 25000,
      },
      {
        partyName: "Bangladesh Islami Front",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 678901,
        candidateName: "Muhammad Faizul Islam",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 5000,
      },
      {
        partyName: "Jatiyo Samajtantrik Dal (JSD)",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 789012,
        candidateName: "Tanjim Ahmed Sohel Taj",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 5000,
      },
      {
        partyName: "Workers Party of Bangladesh",
        logoUrl:
          "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
        candidateId: 890123,
        candidateName: "Rashed Khan Menon",
        candidateImage:
          "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png",
        votes: 5000,
      },
    ],
  },
];

const CastVote = ({ voter }: { voter: Voter }) => {
  const [constituency, setConstituency] = useState<any>(null);

  useEffect(() => {
    const fetchConstituency = async () => {
      const data = await getMyConstituency(voter.constituency);
      setConstituency(data);
      console.log(data);
    };

    fetchConstituency();
  }, []);

  const t = useTranslations("CastVote");

  const formatter = useFormatter();
  console.log(voter);

  if (!constituency) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl">
        {t("title")} {voter.name}
      </h1>
      <h1 className="font-light my-3">Constituency: {constituency?.name}</h1>
      <h1 className="font-light ">
        {t("candidates")}:{" "}
        {formatter.number(constituency?.candidates?.length || 0)}
      </h1>

      <Alert className="text-left w-fit mx-auto my-5 animate-pulse">
        <Vote className="h-4 w-4" />
        <AlertTitle>{t("alert_message")}</AlertTitle>
        <AlertDescription>{t("alert_description")}</AlertDescription>
      </Alert>

      {constituency && (
        <CandidateSelection voter={voter} constituency={constituency} />
      )}
    </div>
  );
};

export default CastVote;
