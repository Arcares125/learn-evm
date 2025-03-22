import { createPublicClient, createWalletClient, http } from "viem";
import { hardhat } from "viem/chains";

// Set up Viem clients
export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export const testClient = {
  mine: async () => {
    await fetch("http://localhost:8545", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "evm_mine",
        params: [],
        id: 1,
      }),
    });
  },
  setNextBlockTimestamp: async (timestamp: number) => {
    await fetch("http://localhost:8545", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "evm_setNextBlockTimestamp",
        params: [timestamp],
        id: 1,
      }),
    });
  },
};

// Simple walletClient for testing
export const walletClient = createWalletClient({
  chain: hardhat,
  transport: http(),
}); 