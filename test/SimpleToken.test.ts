import { expect } from "chai";
import hre from "hardhat";

describe("SimpleToken", function () {
  // Basic contract deployment test - just to verify setup
  it("Should compile and deploy without errors", async function () {
    const { contractAddress } = await hre.viem.deployContract("SimpleToken", [1000000n]);
    expect(contractAddress).to.be.a('string');
  });
}); 