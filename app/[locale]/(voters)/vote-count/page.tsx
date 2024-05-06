"use client";
import VoteCountCard from "@/components/VoteCountCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getConstituencies } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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

const VoteCount = () => {
  const t = useTranslations("Count");

  const [constituencies, setConstituencies] = useState<Constituency[] | null>(
    null
  );

  const [selectedConstituencyName, setSelectedConstituencyName] = useState("");

  const selectedConstituency = constituencies?.find(
    (e) => e.name === selectedConstituencyName
  );

  useEffect(() => {
    getConstituencies().then((data) => {
      setConstituencies(data);
    });
  }, []);

  if (!constituencies)
    return <h1 className="text-center mx-auto text-3xl my-10">Loading...</h1>;

  return (
    <div className="flex flex-col items-center gap-5 container p-10">
      <h2 className="text-5xl font-bold tracking-tighter">{t("title")}</h2>

      <Select
        onValueChange={setSelectedConstituencyName}
        defaultValue={selectedConstituencyName}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={`${t("select_constituency")}`} />
        </SelectTrigger>
        <SelectContent>
          {constituencies.map((data) => {
            return (
              <SelectItem key={data.id} value={data.name}>
                {data.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {selectedConstituency && (
        <VoteCountCard
          constituencyName={selectedConstituencyName}
          totalVotes={selectedConstituency.votes}
          parties={selectedConstituency.candidates}
        />
      )}
    </div>
  );
};

export default VoteCount;
