// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DecentralizedVoting {
    struct Candidate {
        uint256 candidateNumber;
        string candidateName;
        string partyAffiliation;
        string imageURL;
        uint256 votes;
        bool isRegistered;
    }

    struct Constituency {
        string constituencyName;
        mapping(uint256 => Candidate) candidates;
        mapping(uint256 => bool) candidateExists; 
        uint256[] candidateNumbers;
        uint256 totalVotes;
        string winner;
    }

    mapping(address => bool) public hasVoted;

    string public purpose;
    address owner;
    uint256 public totalVotes;
    uint256 public startTime;
    uint256 public endTime;
    
    mapping(string => Constituency) public constituencies;
    string[] public constituencyNumbers;  //No use

    event CandidateAdded(string constituencyName, uint256 candidateNumber, string candidateName);
    event Voted(string constituencyName, address voter, uint256 candidateNumber);
    event VotingEnded(string constituencyName, uint256 winner, string party, string winnerName);

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
        totalVotes = 0;
        startTime = block.timestamp;
        endTime = block.timestamp + 1 days;
    }

    function addCandidate(
        string memory _constituencyName,
        string memory _candidateName,
        uint256 _candidateNumber,
        string memory _partyAffiliation,
        string memory _imageURL
    ) public onlyOwner {
        Constituency storage constituency = constituencies[_constituencyName];

        require(
            !constituency.candidateExists[_candidateNumber],
            "Candidate is already registered in this constituency"
        );

        constituency.candidates[_candidateNumber] = Candidate(_candidateNumber,_candidateName, _partyAffiliation, _imageURL, 0, true);
        constituency.candidateNumbers.push(_candidateNumber);
        constituency.candidateExists[_candidateNumber] = true;

        emit CandidateAdded(_constituencyName, _candidateNumber, _candidateName);
    }

    function vote(string memory _constituencyName, uint256 _candidateNumber) public onlyDuringVotingPeriod {
        Constituency storage constituency = constituencies[_constituencyName];

        require(!hasVoted[msg.sender], "You have already voted");

        require(
            constituency.candidateExists[_candidateNumber],
            "Candidate does not exist in this constituency"
        );

        constituency.candidates[_candidateNumber].votes++;
        totalVotes++;
        constituency.totalVotes++;
        hasVoted[msg.sender] = true;

        emit Voted(_constituencyName, msg.sender, _candidateNumber);
    }

    function getConstituencyCandidates(string memory _constituencyName)
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        Constituency storage constituency = constituencies[_constituencyName];

        uint256 candidateCount = constituency.candidateNumbers.length;
        uint256[] memory candidateNumbers = new uint256[](candidateCount);
        string[] memory candidateNames = new string[](candidateCount);
        string[] memory partyAffiliations = new string[](candidateCount);
        uint256[] memory votes = new uint256[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            uint256 candidateNumber = constituency.candidateNumbers[i];
            candidateNumbers[i] = candidateNumber;
            candidateNames[i] = constituency.candidates[candidateNumber].candidateName;
            partyAffiliations[i] = constituency.candidates[candidateNumber].partyAffiliation;
            votes[i] = constituency.candidates[candidateNumber].votes;
        }

        return (candidateNumbers, candidateNames, partyAffiliations, votes);
    }

    function endVoting(string memory _constituencyName) public onlyOwner onlyAfterVotingPeriod {
        Constituency storage constituency = constituencies[_constituencyName];

        uint256 maxVotes = 0;
        uint winner;

        for (uint256 i = 0; i < constituency.candidateNumbers.length; i++) {
            uint256 candidateNumber = constituency.candidateNumbers[i];
            if (constituency.candidates[candidateNumber].votes > maxVotes) {
                maxVotes = constituency.candidates[candidateNumber].votes;
                winner = candidateNumber;
            }
        }

        constituency.candidates[winner].isRegistered = false; // Mark winner as not registered to prevent further voting
        constituency.winner = constituency.candidates[winner].candidateName;
        string memory winnerParty = constituency.candidates[winner].partyAffiliation;

        emit VotingEnded(
            _constituencyName,
            winner,
            winnerParty,
            constituency.candidates[winner].candidateName
        );
    }
}

