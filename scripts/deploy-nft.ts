import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SimpleNFT contract...");

  // Get the contract factory
  const SimpleNFTFactory = await ethers.getContractFactory("SimpleNFT");
  
  // Deploy the contract
  const simpleNFT = await SimpleNFTFactory.deploy();
  
  // Wait for deployment to finish
  await simpleNFT.waitForDeployment();
  
  // Get the contract address
  const simpleNFTAddress = await simpleNFT.getAddress();
  
  console.log(`SimpleNFT deployed to: ${simpleNFTAddress}`);
  
  // Create example NFTs (optional)
  console.log("Minting initial NFTs...");
  
  // Get contract deployer address
  const [deployer] = await ethers.getSigners();
  
  // Example NFT metadata URIs (would point to IPFS or other storage in production)
  const nftMetadataURIs = [
    "https://example.com/metadata/nft1.json",
    "https://example.com/metadata/nft2.json",
    "https://example.com/metadata/nft3.json"
  ];
  
  for (const uri of nftMetadataURIs) {
    const tx = await simpleNFT.mintNFT(deployer.address, uri);
    await tx.wait();
    console.log(`Minted NFT with URI: ${uri}`);
  }
  
  console.log("Deployment and initial minting completed successfully!");
}

// Execute the deployment function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 