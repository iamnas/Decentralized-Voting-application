// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public admin;
    
    // Struct to represent a voter
    struct Voter {
        bool hasVoted;
        uint8 vote;
    }
    
    // Mapping to store voters
    mapping(address  => mapping(uint => Voter)) public voters;
    
    // Struct to represent a Candidate
    struct Candidate{
        bool isActive;
        string name;
        uint8 voteCount;
    }

    // Array to store candidates
    mapping(uint => Candidate[]) public candidates;


    Candidate public winner;

    uint256 public startTime;
    uint256 public endTime;
    bool public isVotingStart;
    uint256 public nextVoteId=1;

    // Event to announce when a vote is cast
    event Voted(address indexed voter, uint8 vote);

    // Event to add Candidate when a candidate is added
    event AddCandidate(uint indexed id, string name);
    
    // Event to announce when a new admin is set
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    // Modifier to restrict certain functions to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier isVotingOver() {
        require(isVotingStart && endTime > block.timestamp , "Voting is over");
        _;
    }
    
    // Constructor to set the admin and initialize the vote tallies
    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string calldata name) external onlyAdmin {
        require(!isVotingStart,"Voting is Started");
        candidates[nextVoteId].push(Candidate(true,name,0));
        emit AddCandidate(candidates[nextVoteId].length-1,name);
    }

    // Function to change the admin (only callable by the current admin)
    function changeAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        emit AdminChanged(admin, newAdmin);
        admin = newAdmin;
    }
    
    // Function to cast a vote
    function vote(uint8 _id) external isVotingOver {

        require(!voters[msg.sender][nextVoteId].hasVoted, "You have already voted");
        require(candidates[nextVoteId][_id].isActive , "Invalid Candidate Id");

        voters[msg.sender][nextVoteId].hasVoted = true;
        voters[msg.sender][nextVoteId].vote = _id;
        
        candidates[nextVoteId][_id].voteCount++;
        
        emit Voted(msg.sender, _id);
    }
    
    // Function to get the current vote tallies
    function getVoteTallies() external view returns (Candidate[] memory voteTallies) {
        voteTallies = candidates[nextVoteId];
    }

    function getNumCandidates() public view returns(uint){
        return candidates[nextVoteId].length;
    }

    function setVoteTime(uint256 _startTime, uint256 _endTime) public onlyAdmin{
        
        require(!isVotingStart,"Voting already Started");

        uint totalTime = _startTime + _endTime;
        require(totalTime <= 3600,"Time should be less than an hour");
        require(_endTime > 0  ,"Time should be greater than 0");
       
        isVotingStart = true;
        startTime = block.timestamp + _startTime;
        endTime = startTime + _endTime;
    }

    function result() public onlyAdmin{
        require(isVotingStart && endTime <block.timestamp  ,"voting is not yet ended");
        isVotingStart = false;
        startTime =0;
        endTime =0;
        uint maxVoteCandidateId=0;

        if(candidates[nextVoteId].length>1){
            for(uint i=1;i< candidates[nextVoteId].length; i++){

                if(candidates[nextVoteId][i].voteCount > candidates[nextVoteId][maxVoteCandidateId].voteCount){
                    maxVoteCandidateId = i;
                }
            }
        }

        winner = candidates[nextVoteId][maxVoteCandidateId];
        nextVoteId++;
        // delete candidates[nextVoteId];

    }

}
