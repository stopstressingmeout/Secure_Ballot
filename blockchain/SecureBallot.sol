// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureBallot {
    struct Candidate {
        string candidateId;
        string candidateName;
        string partyAffiliation;
        string imageURL;
        uint256 votes;
        bool isRegistered;
    }

    struct Constituency {
        string constituencyId;
        string constituencyName;
        mapping(string => Candidate) candidates;
        mapping(string => bool) candidateExists; 
        string[] candidateIds;
        uint256 totalVotes;
        string winner;
    }

    mapping(address => bool) public hasVoted;
    string public purpose;
    address public owner;
    uint256 public totalVotes;
    uint256 public startTime;
    uint256 public endTime;
    string[] public constituencyIds;
    mapping(string => Constituency) public constituencies;

    event CandidateAdded(string constituencyId, string candidateId, string candidateName, string partyAffiliation);
    event Voted(string constituencyId, address indexed voter, string candidateId);
    event VotingEnded(string constituencyId, string winnerId, string party, string winnerName);
    event VotingPeriodSet(uint256 startTime, uint256 endTime);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyDuringVotingPeriod() {
        require(
            block.timestamp >= startTime && block.timestamp <= endTime,
            "Voting period has ended"
        );
        _;
    }

    modifier onlyAfterVotingPeriod() {
        require(block.timestamp > endTime, "Voting period has not ended yet");
        _;
    }

    constructor(string memory _name) {
        purpose = _name;
        owner = msg.sender;
        totalVotes=0;
    }

    function addConstituency(
        string memory _constituencyId,
        string memory _constituencyName
    ) public onlyOwner {
        require(bytes(constituencies[_constituencyId].constituencyName).length == 0, "Constituency ID already exists");

        Constituency storage newConstituency = constituencies[_constituencyId];
        newConstituency.constituencyId = _constituencyId;
        newConstituency.constituencyName = _constituencyName;
        constituencyIds.push(_constituencyId);
    }

    function addCandidate(
        string memory _constituencyId,
        string memory _candidateId,
        string memory _candidateName,
        string memory _partyAffiliation,
        string memory _imageURL
    ) public onlyOwner {
        Constituency storage constituency = constituencies[_constituencyId];

        require(
            !constituency.candidateExists[_candidateId],
            "Candidate is already registered in this constituency"
        );

        constituency.candidates[_candidateId] = Candidate(_candidateId, _candidateName, _partyAffiliation, _imageURL, 0, true);
        constituency.candidateIds.push(_candidateId);
        constituency.candidateExists[_candidateId] = true;

        emit CandidateAdded(_constituencyId, _candidateId, _candidateName, _partyAffiliation);
    }

    function vote(string memory _constituencyId, string memory _candidateId) public onlyDuringVotingPeriod {
        require(!hasVoted[msg.sender], "You have already voted");

        Constituency storage constituency = constituencies[_constituencyId];

        require(
            constituency.candidateExists[_candidateId],
            "Candidate does not exist in this constituency"
        );

        constituency.candidates[_candidateId].votes++;
        totalVotes++;
        constituency.totalVotes++;
        hasVoted[msg.sender] = true;

        emit Voted(_constituencyId, msg.sender, _candidateId);
    }

    function endVoting() public onlyOwner onlyAfterVotingPeriod {
        for (uint256 i = 0; i < constituencyIds.length; i++) {
            string memory constituencyId = constituencyIds[i];
            Constituency storage constituency = constituencies[constituencyId];
            uint256 maxVotes = 0;
            string memory winnerId;

            for (uint256 j = 0; j < constituency.candidateIds.length; j++) {
                string memory candidateId = constituency.candidateIds[j];
                if (constituency.candidates[candidateId].votes > maxVotes) {
                    maxVotes = constituency.candidates[candidateId].votes;
                    winnerId = candidateId;
                }
            }

            constituency.candidates[winnerId].isRegistered = false; // Mark winner as not registered to prevent further voting
            constituency.winner = constituency.candidates[winnerId].candidateName;
            string memory winnerParty = constituency.candidates[winnerId].partyAffiliation;

            emit VotingEnded(
                constituencyId,
                winnerId,
                winnerParty,
                constituency.candidates[winnerId].candidateName
            );
        }
    }

    function setVotingPeriod(uint256 _startTime, uint256 _endTime) public onlyOwner {
        require(_startTime < _endTime, "Invalid voting period");
        startTime = _startTime;
        endTime = _endTime;
        emit VotingPeriodSet(startTime, endTime);
    }


    function getConstituencyCandidates(string memory _constituencyId)
        public
        view
        returns (
            string[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        Constituency storage constituency = constituencies[_constituencyId];

        uint256 candidateCount = constituency.candidateIds.length;
        string[] memory candidateIds = new string[](candidateCount);
        string[] memory candidateNames = new string[](candidateCount);
        string[] memory partyAffiliations = new string[](candidateCount);
        uint256[] memory votes = new uint256[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            string memory candidateId = constituency.candidateIds[i];
            candidateIds[i] = candidateId;
            candidateNames[i] = constituency.candidates[candidateId].candidateName;
            partyAffiliations[i] = constituency.candidates[candidateId].partyAffiliation;
            votes[i] = constituency.candidates[candidateId].votes;
        }

        return (candidateIds, candidateNames, partyAffiliations, votes);
    }

    function retrieve() public view returns (uint256){
        return totalVotes;
    }
}
