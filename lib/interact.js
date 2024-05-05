import { ethers } from "ethers";

const NODE_ENDPOINT = "http://127.0.0.1:8545";
const USER_PRIVATE_KEY =
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

const provider = new ethers.JsonRpcProvider(NODE_ENDPOINT);
const signer = new ethers.Wallet(USER_PRIVATE_KEY, provider);

const userAddress = signer.address;

const contractAddress = "0xa50a51c09a5c451c52bb714527e1974b686d8e77";
const contractABI = [
  // ABI definitions for interacting with the contract
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "constituencyName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
    ],
    name: "CandidateAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "constituencyName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateNumber",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "constituencyName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winner",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "party",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "winnerName",
        type: "string",
      },
    ],
    name: "VotingEnded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_constituencyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_candidateName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_candidateNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_partyAffiliation",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageURL",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "constituencies",
    outputs: [
      {
        internalType: "string",
        name: "constituencyName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "totalVotes",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "winner",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "constituencyNumbers",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_constituencyName",
        type: "string",
      },
    ],
    name: "endVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_constituencyName",
        type: "string",
      },
    ],
    name: "getConstituencyCandidates",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "purpose",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_constituencyName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_candidateNumber",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const contractWithSigner = contract.connect(signer);

async function addCandidate(
  constituencyName,
  candidateName,
  candidateNumber,
  partyAffiliation,
  imageURL
) {
  try {
    const tx = await contractWithSigner.addCandidate(
      constituencyName,
      candidateName,
      candidateNumber,
      partyAffiliation,
      imageURL
    );
    await tx.wait();
    console.log("Candidate added successfully");
  } catch (error) {
    console.error("Error adding candidate:", error);
  }
}

async function vote(constituencyName, candidateNumber) {
  try {
    const tx = await contractWithSigner.vote(constituencyName, candidateNumber);
    await tx.wait();
    console.log("Voted successfully");
  } catch (error) {
    console.error("Error voting:", error);
  }
}

async function getConstituencyCandidates(constituencyName) {
  try {
    const result = await contract.getConstituencyCandidates(constituencyName);
    console.log("Candidates:", result);
  } catch (error) {
    console.error("Error retrieving candidates:", error);
  }
}

async function endVoting(constituencyName) {
  try {
    const tx = await contractWithSigner.endVoting(constituencyName);
    await tx.wait();
    console.log("Voting ended successfully");
  } catch (error) {
    console.error("Error ending voting:", error);
  }
}

// Call the functions
(async () => {
  await addCandidate("Constituency1", "Candidate1", 1, "Party1", "image1.jpg");
  await addCandidate("Constituency1", "Candidate2", 2, "Party2", "image2.jpg");
  await addCandidate("Constituency2", "Candidate3", 1, "Party3", "image3.jpg");

  await getConstituencyCandidates("Constituency1");

  await vote("Constituency1", 1);
  await vote("Constituency1", 2);

  await endVoting("Constituency1");
  await endVoting("Constituency2");
})().catch(console.error);
