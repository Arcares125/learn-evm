import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SimpleNFT", function () {
  // Variables used in multiple tests
  let simpleNFT: SimpleNFT;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  
  // Sample token URIs
  const tokenURI1 = "https://example.com/metadata/nft1.json";
  const tokenURI2 = "https://example.com/metadata/nft2.json";
  const tokenURI3 = "https://example.com/metadata/nft3.json";

  // Before each test, deploy a new SimpleNFT contract
  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy the contract
    const SimpleNFTFactory = await ethers.getContractFactory("SimpleNFT");
    simpleNFT = await SimpleNFTFactory.deploy();
  });

  // Test initial state
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await simpleNFT.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await simpleNFT.name()).to.equal("Simple NFT");
      expect(await simpleNFT.symbol()).to.equal("SNFT");
    });

    it("Should start with no minted NFTs", async function () {
      expect(await simpleNFT.getTotalMinted()).to.equal(0);
    });

    it("Should have a max supply of 1000", async function () {
      expect(await simpleNFT.maxSupply()).to.equal(1000);
    });
  });

  // Test NFT minting
  describe("Minting NFTs", function () {
    it("Should allow owner to mint an NFT", async function () {
      await simpleNFT.mintNFT(user1.address, tokenURI1);
      
      expect(await simpleNFT.getTotalMinted()).to.equal(1);
      expect(await simpleNFT.ownerOf(0)).to.equal(user1.address);
      expect(await simpleNFT.tokenURI(0)).to.equal(tokenURI1);
    });

    it("Should emit NFTMinted event when minting", async function () {
      await expect(simpleNFT.mintNFT(user1.address, tokenURI1))
        .to.emit(simpleNFT, "NFTMinted")
        .withArgs(user1.address, 0, tokenURI1);
    });

    it("Should not allow non-owner to mint NFTs", async function () {
      await expect(
        simpleNFT.connect(user1).mintNFT(user2.address, tokenURI1)
      ).to.be.revertedWithCustomError(simpleNFT, "OwnableUnauthorizedAccount");
      
      expect(await simpleNFT.getTotalMinted()).to.equal(0);
    });

    it("Should not allow reusing the same URI", async function () {
      await simpleNFT.mintNFT(user1.address, tokenURI1);
      
      await expect(
        simpleNFT.mintNFT(user2.address, tokenURI1)
      ).to.be.revertedWith("Token URI already used");
    });
  });

  // Test maximum supply
  describe("Max Supply", function () {
    it("Should allow owner to update max supply", async function () {
      await simpleNFT.setMaxSupply(2000);
      expect(await simpleNFT.maxSupply()).to.equal(2000);
    });

    it("Should not allow non-owner to update max supply", async function () {
      await expect(
        simpleNFT.connect(user1).setMaxSupply(500)
      ).to.be.revertedWithCustomError(simpleNFT, "OwnableUnauthorizedAccount");
    });

    it("Should not allow setting max supply lower than current token count", async function () {
      // Mint 5 NFTs
      for (let i = 0; i < 5; i++) {
        await simpleNFT.mintNFT(user1.address, `${tokenURI1}${i}`);
      }
      
      // Try to set max supply to 3
      await expect(
        simpleNFT.setMaxSupply(3)
      ).to.be.revertedWith("New max supply must be >= current token count");
    });
  });

  // Test NFT transfers
  describe("NFT Transfers", function () {
    beforeEach(async function () {
      // Mint an NFT to user1 for testing transfers
      await simpleNFT.mintNFT(user1.address, tokenURI1);
    });

    it("Should allow owner to transfer NFT", async function () {
      await simpleNFT.connect(user1).transferFrom(user1.address, user2.address, 0);
      
      expect(await simpleNFT.ownerOf(0)).to.equal(user2.address);
    });

    it("Should allow approved address to transfer NFT", async function () {
      // User1 approves owner to transfer their NFT
      await simpleNFT.connect(user1).approve(owner.address, 0);
      
      // Owner transfers the NFT to user2
      await simpleNFT.transferFrom(user1.address, user2.address, 0);
      
      expect(await simpleNFT.ownerOf(0)).to.equal(user2.address);
    });
  });
}); 