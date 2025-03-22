import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SimpleToken contract...");

  // Initial supply of 1,000,000 tokens
  const initialSupply = 1000000;

  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log("Deployer address:", (await ethers.getSigners())[0].address);

  // Get the contract factory
  const SimpleTokenFactory = await ethers.getContractFactory("SimpleToken");
  
  // Deploy the contract
  const simpleToken = await SimpleTokenFactory.deploy(initialSupply);
  
  // Wait for deployment to finish
  await simpleToken.waitForDeployment();
  
  // Get the contract address
  const simpleTokenAddress = await simpleToken.getAddress();
  
  console.log(`SimpleToken deployed to: ${simpleTokenAddress}`);
  console.log(`Initial supply: ${initialSupply} STK`);
  console.log(`Verify contract on Etherscan:`);
  console.log(`npx hardhat verify --network ${(await ethers.provider.getNetwork()).name} ${simpleTokenAddress} ${initialSupply}`);
}

// Execute the deployment function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 