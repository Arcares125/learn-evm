// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleVoting
 * @dev A simple voting contract where the owner can add proposals and users can vote
 */
contract SimpleVoting is Ownable {
    // Structure for a proposal
    struct Proposal {
        string description;
        uint256 voteCount;
        bool active;
    }
    
    // Array to store all proposals
    Proposal[] public proposals;
    
    // Mapping to track if an address has voted for a specific proposal
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    // Events
    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(address indexed voter, uint256 indexed proposalId);
    event ProposalStatusChanged(uint256 indexed proposalId, bool active);
    
    /**
     * @dev Constructor for SimpleVoting
     */
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Function to create a new proposal
     * @param _description Description of the proposal
     * @return The ID of the newly created proposal
     */
    function createProposal(string memory _description) public onlyOwner returns (uint256) {
        proposals.push(Proposal({
            description: _description,
            voteCount: 0,
            active: true
        }));
        
        uint256 proposalId = proposals.length - 1;
        emit ProposalCreated(proposalId, _description);
        
        return proposalId;
    }
    
    /**
     * @dev Function to vote on an active proposal
     * @param _proposalId The ID of the proposal to vote on
     */
    function vote(uint256 _proposalId) public {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(proposals[_proposalId].active, "Proposal is not active");
        require(!hasVoted[msg.sender][_proposalId], "Already voted on this proposal");
        
        // Record the vote
        proposals[_proposalId].voteCount += 1;
        hasVoted[msg.sender][_proposalId] = true;
        
        emit Voted(msg.sender, _proposalId);
    }
    
    /**
     * @dev Function to change the status of a proposal
     * @param _proposalId The ID of the proposal
     * @param _active The new status (active or inactive)
     */
    function setProposalStatus(uint256 _proposalId, bool _active) public onlyOwner {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        
        proposals[_proposalId].active = _active;
        emit ProposalStatusChanged(_proposalId, _active);
    }
    
    /**
     * @dev Function to get the details of a proposal
     * @param _proposalId The ID of the proposal
     * @return description The description of the proposal
     * @return voteCount The number of votes for the proposal
     * @return active Whether the proposal is active
     */
    function getProposal(uint256 _proposalId) public view returns (
        string memory description,
        uint256 voteCount,
        bool active
    ) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.voteCount, proposal.active);
    }
    
    /**
     * @dev Function to get the total number of proposals
     * @return The total number of proposals
     */
    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }
} 