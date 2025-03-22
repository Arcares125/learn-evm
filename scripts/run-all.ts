import { execSync } from "child_process";

/**
 * This script runs all the main operations: compilation, tests, and deployments
 * It provides a quick way to validate the entire project
 */
async function main() {
  try {
    console.log("========== Starting EVM Blockchain Learning Project Workflow ==========");
    
    // Step 1: Compile contracts
    console.log("\n\n🔨 STEP 1: Compiling smart contracts...");
    execSync("npx hardhat compile", { stdio: "inherit" });
    
    // Step 2: Run tests
    console.log("\n\n🧪 STEP 2: Running tests...");
    execSync("npx hardhat test", { stdio: "inherit" });
    
    // Step 3: Start a local node (in background)
    console.log("\n\n🌐 STEP 3: Starting local Hardhat node (in a separate terminal)...");
    console.log("Run this command in a new terminal: npx hardhat node");
    
    // Step 4: Deploy contracts to local network
    console.log("\n\n🚀 STEP 4: To deploy contracts to the local network, run:");
    console.log("npx hardhat run scripts/deploy-token.ts --network localhost");
    console.log("npx hardhat run scripts/deploy-voting.ts --network localhost");
    console.log("npx hardhat run scripts/deploy-nft.ts --network localhost");
    
    // Step 5: Learning resources
    console.log("\n\n📚 STEP 5: Next steps for learning:");
    console.log("1. Read the docs/learning-guide.md file");
    console.log("2. Explore and modify the smart contracts");
    console.log("3. Write additional tests");
    console.log("4. Try creating your own smart contract");
    
    console.log("\n\n✅ Workflow completed successfully!");
    console.log("=================================================================");
  } catch (error) {
    console.error("Error executing workflow:", error);
    process.exit(1);
  }
}

// Execute the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 