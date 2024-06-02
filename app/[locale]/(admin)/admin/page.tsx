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
  addVoter,
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
import { cookies } from "next/headers";

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
  const cookie = document.cookie;
  console.log(cookie);

  if (!cookie.includes("admin-auth")) {
    window.location.href = "/admin/login";
  }

  const { toast } = useToast();

  const [elections, setElections] = useState<Election[]>([]);
  const [addingConstituency, setAddingConstituency] = useState<boolean>(false);
  const [addingCandidate, setAddingCandidate] = useState<boolean>(false);
  const [constituencyName, setConstituencyName] = useState<string>("");
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [addingVoter, setAddingVoter] = useState<boolean>(false);
  const [voterName, setVoterName] = useState<string>("Test User");
  const [phone, setPhone] = useState<string>("01634626469");
  const [email, setEmail] = useState<string>("test@user.com");
  const [address, setAddress] = useState<string>("Test Location");
  const [constituency, setConstituency] = useState<string>("");
  const [voterMother, setVoterMother] = useState<string>("Test Mother");
  const [voterFather, setVoterFather] = useState<string>("Test Father");
  const [voterNID, setVoterNID] = useState<string>("9999999999");
  const [voterDOB, setVoterDOB] = useState<string>("01/01/1998");

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

  const handleVoterAdding = () => {
    setAddingVoter(true);
    console.log(constituency);

    if (
      !voterName ||
      !phone ||
      !email ||
      !address ||
      !voterMother ||
      !voterFather ||
      !voterNID ||
      !voterDOB ||
      !constituency
    ) {
      setAddingVoter(false);
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }

    addVoter(
      voterNID,
      voterName,
      voterFather,
      voterMother,
      voterDOB,
      phone,
      constituency,
      email,
      address
    ).then((data) => {
      if (data.status === "success") {
        setVoterName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setVoterMother("");
        setVoterFather("");
        setVoterNID("");
        setVoterDOB("");
        setConstituency("");

        // getConstituencies().then((data) => setConstituencies(data));
        toast({
          title: data.message,
        });
      } else {
        toast({
          title: data.message,
          variant: "destructive",
        });
      }
      setAddingVoter(false);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
      <Card className="col-span-1  max-w-lg mx-auto md:mx-0 md:ml-auto w-full">
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
      <Card className="col-span-1 max-w-lg mx-auto md:mx-0 md:mr-auto w-full">
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
      <Card className="col-span-1  max-w-lg mx-auto md:mx-0 md:ml-auto w-full">
        <CardHeader>
          <CardTitle>Add Voter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <Input
              onChange={(e) => setVoterName(e.target.value)}
              value={voterName}
              id="voterName"
              placeholder="Voter Name"
            />
            <Input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              id="phone"
              placeholder="Phone"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              placeholder="Email"
            />
            <Input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="address"
              placeholder="Address"
            />
            <Input
              onChange={(e) => setVoterMother(e.target.value)}
              value={voterMother}
              id="voterMother"
              placeholder="Mother's Name"
            />
            <Input
              onChange={(e) => setVoterFather(e.target.value)}
              value={voterFather}
              id="voterFather"
              placeholder="Father's Name"
            />
            <Input
              onChange={(e) => setVoterNID(e.target.value)}
              value={voterNID}
              id="voterNID"
              placeholder="NID"
            />
            <Input
              onChange={(e) => setVoterDOB(e.target.value)}
              value={voterDOB}
              id="voterDOB"
              placeholder="Date of Birth"
            />
            <Select value={constituency} onValueChange={setConstituency}>
              <SelectTrigger id="constituency">
                <SelectValue placeholder="Constituency" />
              </SelectTrigger>
              <SelectContent position="popper">
                {constituencies.map((constituency) => (
                  <SelectItem key={constituency.id} value={constituency.name}>
                    {constituency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={addingVoter} onClick={handleVoterAdding}>
            {addingVoter ? "Adding..." : "Add"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-1  max-w-lg mx-auto md:mx-0 md:mr-auto w-full">
        <CardHeader>
          <CardTitle>Candidate List</CardTitle>
        </CardHeader>
        <CardContent>
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
                            <TableHead className="w-40 text-left">
                              Name
                            </TableHead>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
