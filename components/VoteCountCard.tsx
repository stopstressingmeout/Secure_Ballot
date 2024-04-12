"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, MapPin } from "lucide-react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
  Legend,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

type VoteCountProps = {
  constituencyName: string;
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

const VoteCountCard = ({
  constituencyName,
  totalVotes,
  parties,
}: VoteCountProps) => {
  const numberOfParties = parties.length;

  const sortedParties = parties.sort((a, b) => b.votes - a.votes);

  const topParties = sortedParties.slice(
    0,
    numberOfParties > 3 ? 3 : numberOfParties
  );

  const otherPartiesJoinedTogether = sortedParties
    .slice(3)
    .reduce((acc, party) => acc + party.votes, 0);

  topParties.push({
    partyName: "Others",
    logoUrl: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
    candidateId: 0,
    candidateName: "Others",
    candidateImage:
      "https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png",
    votes: otherPartiesJoinedTogether,
  });

  const data = topParties.map((party) => ({
    value: party.votes,
    label: party.partyName,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabelMobile = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="flex flex-col z-10"
      >
        {data[index].value} votes {"\n"}
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-center gap-4 h-32">
        <MapPin className="w-8 h-8" />
        <div className="grid text-center">
          <CardTitle className="text-3xl">{constituencyName}</CardTitle>
          <CardDescription>{totalVotes} votes</CardDescription>
        </div>
      </CardHeader>
      <div className="my-5">
        <ResponsiveContainer
          width="100%"
          height={400}
          className="hidden md:block"
        >
          <PieChart>
            <Pie
              className=""
              data={data}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={60}
              strokeWidth={2}
              fill="#8884d8"
              stroke="black"
              dataKey="value"
              nameKey="label"
              textAnchor="start"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer
          width="100%"
          height={400}
          className="block md:hidden"
        >
          <PieChart>
            <Pie
              labelLine={false}
              data={data}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabelMobile}
              outerRadius={120}
              fill="#8884d8"
              stroke="black"
              strokeWidth={2}
              dataKey="value"
              nameKey="label"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CardContent className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedParties.map((party) => (
            <Card key={party.partyName}>
              <CardHeader>
                <CardTitle className="text-center mb-5 ">
                  {party.partyName}
                </CardTitle>
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="flex justify-end">
                    <Avatar>
                      <AvatarImage src={party.logoUrl} alt={party.partyName} />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex justify-start">
                    <Avatar>
                      <AvatarImage
                        src={party.candidateImage}
                        alt={party.candidateName}
                      />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center flex flex-col justify-center items-center ">
                <div className="mb-2">
                  <h1 className="text-muted-foreground text-sm font-semibold">
                    Candidate Name
                  </h1>
                  {party.candidateName}
                </div>
                <Button
                  variant={"link"}
                  className="text-muted-foreground hover:text-white p-0"
                >
                  <ExternalLink className="mr-1" />
                  Affidavit
                </Button>
                <Button
                  variant={"link"}
                  className="text-muted-foreground hover:text-white  p-0"
                >
                  <ExternalLink className="mr-1" />
                  Income Tax Return
                </Button>
              </CardContent>
              <CardFooter className="text-centerflex flex-col justify-center items-center">
                <div className="border border-accent-foreground py-3 px-10 relative animate-pulse rounded-lg ">
                  <h1 className=" text-sm font-semibold absolute z-10 -top-3 left-1/2 -translate-x-1/2 bg-background px-2">
                    Votes
                  </h1>
                  <h1 className="text-accent-foreground">{party.votes}</h1>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoteCountCard;
