import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleVoting } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SimpleVoting", function () {
  // Variables used in multiple tests
  let simpleVoting: SimpleVoting;
  let owner: HardhatEthersSigner;
  let voter1: HardhatEthersSigner;
  let voter2: HardhatEthersSigner;

  // Before each test, deploy a new SimpleVoting contract
  beforeEach(async function () {
    // Get signers
    [owner, voter1, voter2] = await ethers.getSigners();

    // Deploy the contract
    const SimpleVotingFactory = await ethers.getContractFactory("SimpleVoting");
    simpleVoting = await SimpleVotingFactory.deploy();
  });

  // Test initial state
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await simpleVoting.owner()).to.equal(owner.address);
    });

    it("Should start with no proposals", async function () {
      expect(await simpleVoting.getProposalCount()).to.equal(0);
    });
  });

  // Test proposal creation
  describe("Creating Proposals", function () {
    it("Should allow owner to create a proposal", async function () {
      await simpleVoting.createProposal("Test Proposal");
      
      expect(await simpleVoting.getProposalCount()).to.equal(1);
      
      const [description, voteCount, active] = await simpleVoting.getProposal(0);
      expect(description).to.equal("Test Proposal");
      expect(voteCount).to.equal(0);
      expect(active).to.equal(true);
    });

    it("Should emit ProposalCreated event on creation", async function () {
      await expect(simpleVoting.createProposal("Test Proposal"))
        .to.emit(simpleVoting, "ProposalCreated")
        .withArgs(0, "Test Proposal");
    });

    it("Should not allow non-owner to create a proposal", async function () {
      await expect(
        simpleVoting.connect(voter1).createProposal("Unauthorized Proposal")
      ).to.be.revertedWithCustomError(simpleVoting, "OwnableUnauthorizedAccount");
      
      expect(await simpleVoting.getProposalCount()).to.equal(0);
    });
  });

  // Test voting
  describe("Voting", function () {
    beforeEach(async function () {
      // Create a proposal for testing
      await simpleVoting.createProposal("Test Proposal");
    });

    it("Should allow users to vote", async function () {
      await simpleVoting.connect(voter1).vote(0);
      
      const [, voteCount, ] = await simpleVoting.getProposal(0);
      expect(voteCount).to.equal(1);
    });

    it("Should emit Voted event when voting", async function () {
      await expect(simpleVoting.connect(voter1).vote(0))
        .to.emit(simpleVoting, "Voted")
        .withArgs(voter1.address, 0);
    });

    it("Should not allow voting on invalid proposal ID", async function () {
      await expect(
        simpleVoting.connect(voter1).vote(999)
      ).to.be.revertedWith("Invalid proposal ID");
    });

    it("Should not allow voting twice on the same proposal", async function () {
      await simpleVoting.connect(voter1).vote(0);
      
      await expect(
        simpleVoting.connect(voter1).vote(0)
      ).to.be.revertedWith("Already voted on this proposal");
    });

    it("Should not allow voting on inactive proposals", async function () {
      // Set proposal inactive
      await simpleVoting.setProposalStatus(0, false);
      
      await expect(
        simpleVoting.connect(voter1).vote(0)
      ).to.be.revertedWith("Proposal is not active");
    });
  });

  // Test proposal status changes
  describe("Managing Proposals", function () {
    beforeEach(async function () {
      // Create a proposal for testing
      await simpleVoting.createProposal("Test Proposal");
    });

    it("Should allow owner to change proposal status", async function () {
      await simpleVoting.setProposalStatus(0, false);
      
      const [, , active] = await simpleVoting.getProposal(0);
      expect(active).to.equal(false);
      
      await simpleVoting.setProposalStatus(0, true);
      
      const [, , newActive] = await simpleVoting.getProposal(0);
      expect(newActive).to.equal(true);
    });

    it("Should emit ProposalStatusChanged event", async function () {
      await expect(simpleVoting.setProposalStatus(0, false))
        .to.emit(simpleVoting, "ProposalStatusChanged")
        .withArgs(0, false);
    });

    it("Should not allow non-owner to change proposal status", async function () {
      await expect(
        simpleVoting.connect(voter1).setProposalStatus(0, false)
      ).to.be.revertedWithCustomError(simpleVoting, "OwnableUnauthorizedAccount");
    });
  });
}); 