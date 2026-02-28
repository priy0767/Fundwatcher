// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Fundwatcher {
    // State variables
    address public admin;
    uint256 public proposalCount;

    // Define the possible states of a budget request
    enum ProposalStatus {
        Pending,
        Approved,
        Rejected
    }

    // The blueprint for a budget proposal
    struct Proposal {
        uint256 id;
        address payable proposer; // 'payable' allows this address to receive funds
        uint256 requestedAmount;
        ProposalStatus status;
    }

    // Our database mapping a unique ID to a Proposal
    mapping(uint256 => Proposal) public proposals;

    // Events let our React frontend know when something happens on the blockchain
    event ProposalCreated(uint256 id, address proposer, uint256 amount);
    event ProposalApproved(uint256 id, address proposer, uint256 amount);

    // Runs once when the contract is deployed
    constructor() {
        admin = msg.sender; // The wallet that deploys this becomes the admin
    }

    // Security check: Only the admin can run functions with this tag
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // 1. Club President submits a budget request
    function submitProposal(uint256 _requestedAmount) public {
        require(_requestedAmount > 0, "Amount must be greater than 0");

        proposalCount++; // Create a new unique ID

        // Save it to the blockchain
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: payable(msg.sender),
            requestedAmount: _requestedAmount,
            status: ProposalStatus.Pending
        });

        // Tell the React frontend to update
        emit ProposalCreated(proposalCount, msg.sender, _requestedAmount);
    }

    // 2. Admin approves and funds the club
    function approveAndFund(uint256 _proposalId) public onlyAdmin {
        // Fetch the proposal from the mapping
        Proposal storage proposal = proposals[_proposalId];

        // Security checks
        require(proposal.id == _proposalId, "Proposal does not exist");
        require(
            proposal.status == ProposalStatus.Pending,
            "Proposal is not pending"
        );
        require(
            address(this).balance >= proposal.requestedAmount,
            "Insufficient treasury funds"
        );

        // Update the status
        proposal.status = ProposalStatus.Approved;

        // Transfer the actual testnet tokens to the club president's wallet
        (bool success, ) = proposal.proposer.call{
            value: proposal.requestedAmount
        }("");
        require(success, "Transfer failed");

        // Tell the React frontend the money moved
        emit ProposalApproved(
            _proposalId,
            proposal.proposer,
            proposal.requestedAmount
        );
    }

    // 3. Allow the contract to receive testnet funds to act as the campus treasury
    receive() external payable {}
}
