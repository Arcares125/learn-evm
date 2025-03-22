import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SimpleVoting contract...");

  // Get the contract factory
  const SimpleVotingFactory = await ethers.getContractFactory("SimpleVoting");
  
  // Deploy the contract
  const simpleVoting = await SimpleVotingFactory.deploy();
  
  // Wait for deployment to finish
  await simpleVoting.waitForDeployment();
  
  // Get the contract address
  const simpleVotingAddress = await simpleVoting.getAddress();
  
  console.log(`SimpleVoting deployed to: ${simpleVotingAddress}`);
  
  // Create initial proposals (optional)
  console.log("Creating initial proposals...");
  
  const proposals = [
    "Proposal 1: Implement feature X",
    "Proposal 2: Fix bug Y",
    "Proposal 3: Optimize function Z"
  ];
  
  for (const proposal of proposals) {
    const tx = await simpleVoting.createProposal(proposal);
    await tx.wait();
    console.log(`Created proposal: ${proposal}`);
  }
  
  console.log("Deployment and initial setup completed successfully!");
}

// Execute the deployment function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 