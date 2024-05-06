"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  addCandidate,
  addConstituency,
  getConstituencies,
  getElections,
} from "@/lib/actions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type Election = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
};

type Constituency = {
  id: string;
  name: string;
  votes: number;
  candidates?: Candidate[];
};

type Candidate = {
  id: string;
  name: string;
  party: string;
  votes: number;
  image: string;
  belongingConstituencyId: string;
  winningConstituencyId?: string;
};

const AdminPage = () => {
  const { toast } = useToast();

  const [elections, setElections] = useState<Election[]>([]);
  const [addingConstituency, setAddingConstituency] = useState<boolean>(false);
  const [addingCandidate, setAddingCandidate] = useState<boolean>(false);
  const [constituencyName, setConstituencyName] = useState<string>("");
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [candidateName, setCandidateName] = useState<string>("");
  const [candidateParty, setCandidateParty] = useState<string>("");
  const [candidateImage, setCandidateImage] = useState<string>(
    "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png"
  );
  const [partyLogo, setPartyLogo] = useState<string>(
    "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
  );
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");

  useEffect(() => {
    getElections().then((data) => setElections(data));
    getConstituencies().then((data) => setConstituencies(data));
  }, []);

  const handleConstituencyAdding = () => {
    setAddingConstituency(true);
    if (!constituencyName) {
      setAddingCandidate(false);
      toast({
        title: "Please fill the constituency name",
        variant: "destructive",
      });
      return;
    }

    addConstituency(constituencyName).then((data) => {
      if (data.status === "success") {
        setConstituencyName("");
        getConstituencies().then((data) => setConstituencies(data));

        toast({
          title: data.message,
        });

        setAddingConstituency(false);
      } else {
        toast({
          title: data.message,
          variant: "destructive",
        });

        setAddingConstituency(false);
      }
    });
  };

  const handleCandidateAdding = () => {
    setAddingCandidate(true);
    if (!selectedConstituency) {
      setAddingCandidate(false);

      toast({
        title: "Please select a constituency",
        variant: "destructive",
      });
      return;
    }
    if (!candidateName || !candidateParty) {
      setAddingCandidate(false);
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }

    !candidateImage &&
      setCandidateImage(
        "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-t-shirt-on-gray-background-png-image_4853791.png"
      );
    !partyLogo &&
      setPartyLogo(
        "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
      );

    addCandidate(
      candidateName,
      candidateParty,
      candidateImage,
      selectedConstituency,
      partyLogo
    ).then((data) => {
      if (data.status === "success") {
        setCandidateName("");
        setCandidateParty("");
        setSelectedConstituency("");

        getConstituencies().then((data) => setConstituencies(data));
        toast({
          title: data.message,
        });
      } else {
        toast({
          title: data.message,
          variant: "destructive",
        });
      }
      setAddingCandidate(false);
    });
  };
  return (
    <div className="flex flex-col justify-center items-center text-center w-full p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <Card className="max-w-lg mx-auto md:mx-0 md:ml-auto w-full">
          <CardHeader>
            <CardTitle>Add Constituencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Input
                onChange={(e) => setConstituencyName(e.target.value)}
                value={constituencyName}
                id="name"
                placeholder="Constituency Name"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={addingConstituency}
              onClick={handleConstituencyAdding}
            >
              {addingConstituency ? "Adding..." : "Add"}
            </Button>
          </CardFooter>
        </Card>
        <Card className="max-w-lg md:mx-0 mx-auto md:mr-auto w-full">
          <CardHeader>
            <CardTitle>Add Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Select
                value={selectedConstituency}
                onValueChange={setSelectedConstituency}
              >
                <SelectTrigger id="constituency">
                  <SelectValue placeholder="Constituency" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {constituencies.map((constituency) => (
                    <SelectItem key={constituency.id} value={constituency.id}>
                      {constituency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                onChange={(e) => setCandidateName(e.target.value)}
                value={candidateName}
                id="candidateName"
                placeholder="Candidate Name"
              />
              <Input
                onChange={(e) => setCandidateImage(e.target.value)}
                value={candidateImage}
                id="candidateImage"
                placeholder="Candidate Image URL"
              />
              <Input
                onChange={(e) => setCandidateParty(e.target.value)}
                value={candidateParty}
                id="candidateParty"
                placeholder="Affiliated Party"
              />
              <Input
                onChange={(e) => setPartyLogo(e.target.value)}
                value={partyLogo}
                id="partyLogo"
                placeholder="Party Logo URL"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button disabled={addingCandidate} onClick={handleCandidateAdding}>
              {addingCandidate ? "Adding..." : "Add"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="my-10">
        <h1 className="text-2xl">Candidate List</h1>
        <Table className="">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="text-left">Constituency</TableHead>
              <TableHead className="text-center w-full">
                Candidate Info
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {constituencies.map((constituency) => {
              return (
                <TableRow key={constituency.id} className="">
                  <TableCell className="font-medium text-left border-r-2">
                    {constituency.name}
                  </TableCell>
                  <TableCell className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted">
                          <TableHead className="w-40 text-left">Name</TableHead>
                          <TableHead>Party</TableHead>
                          <TableHead className="text-right">Votes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {constituency.candidates?.map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell className="text-left">
                              {candidate.name}
                            </TableCell>
                            <TableCell>{candidate.party}</TableCell>
                            <TableCell className="text-right">
                              {candidate.votes}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
