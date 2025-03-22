# EVM Blockchain Learning Project

This project is designed to help you learn Ethereum blockchain development through practical examples.

## What is EVM?

The Ethereum Virtual Machine (EVM) is a computation engine that acts as a decentralized computer with millions of executable projects. It's the environment in which all Ethereum accounts and smart contracts live.

## Project Setup

### Prerequisites
- Node.js (v14+) and npm
- Git
- A code editor (VS Code recommended)

### Installation

1. Clone this repository:
```
git clone <repository-url>
cd evm
```

2. Install dependencies:
```
npm install
```

3. Install Hardhat globally (optional):
```
npm install -g hardhat
```

## Tools/Libraries Used

- **Hardhat**: Ethereum development environment
- **Ethers.js**: Library for interacting with the Ethereum blockchain
- **OpenZeppelin**: Library for secure smart contract development
- **Solidity**: Programming language for writing smart contracts

## Commands

- Initialize project: `npm init -y`
- Install Hardhat: `npm install --save-dev hardhat`
- Create Hardhat project: `npx hardhat`
- Compile contracts: `npx hardhat compile`
- Run tests: `npx hardhat test`
- Start local blockchain: `npx hardhat node`
- Deploy contracts: `npx hardhat run scripts/deploy.js --network localhost`

## Folder Structure

```
evm/
├── contracts/             # Smart contract source files
├── scripts/               # Deployment and interaction scripts
├── test/                  # Test files for smart contracts
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## Features

1. **Token Contract**: A simple ERC20 token implementation
2. **Voting System**: A basic voting mechanism
3. **NFT Contract**: A simple NFT (ERC721) implementation

## Learning Path

1. **Basics of Blockchain**: Understand the fundamentals
2. **Solidity Programming**: Learn the language for smart contracts
3. **Smart Contract Deployment**: Put your contracts on a blockchain
4. **Contract Interaction**: Learn to communicate with deployed contracts
5. **Advanced Topics**: Security, gas optimization, upgradability

## Quiz

1. What is the main purpose of the EVM?
   - A. To mine Ethereum
   - B. To provide a runtime environment for smart contracts
   - C. To store all Ethereum transactions
   - D. To validate Ethereum addresses

2. What is a smart contract?
   - A. A legal document on the blockchain
   - B. Self-executing code that runs on the blockchain
   - C. A contract between miners
   - D. A type of cryptocurrency

3. Which of these is NOT a feature of blockchain?
   - A. Decentralization
   - B. Immutability
   - C. Centralized control
   - D. Transparency

Answers: 1-B, 2-B, 3-C

## Next Steps

After completing this learning project, consider:
- Building a DApp (Decentralized Application)
- Learning about Layer 2 solutions
- Exploring DeFi (Decentralized Finance) protocols
- Contributing to open-source blockchain projects

## Testing & Deployment Approach

For this learning project, we've provided:

1. **Complete smart contracts**: All three contracts (SimpleToken, SimpleVoting, SimpleNFT) are fully implemented with comments.
2. **Test files**: Test files are included but may need adaptation for your specific environment.
3. **Deployment scripts**: Scripts to deploy each contract to a local network.

To get started with the contracts:

```bash
# Compile the contracts
npx hardhat compile

# Start a local Hardhat node in a separate terminal
npx hardhat node

# Deploy contracts (in a separate terminal)
npx hardhat run scripts/deploy-token.ts --network localhost
npx hardhat run scripts/deploy-voting.ts --network localhost
npx hardhat run scripts/deploy-nft.ts --network localhost
```

The contracts themselves are well-documented and serve as the primary learning resource, along with the learning guide in the docs directory.

## Environment Setup

This project uses environment variables for configuration. Follow these steps to set them up:

1. Copy the example environment file to create your own:
```bash
cp .env.example .env
```

2. Edit the `.env` file to add your own values:
   - `INFURA_API_KEY`: Your Infura API key for connecting to Ethereum networks
   - `PRIVATE_KEY`: Your wallet private key for deployments (without 0x prefix)
   - `ETHERSCAN_API_KEY`: Your Etherscan API key for verifying contracts

⚠️ **IMPORTANT**: Never commit your `.env` file or expose your private keys. The `.env` file is included in `.gitignore` to prevent accidental commits.

## Deploying to Testnet or Mainnet

After configuring your environment variables, you can deploy to any network configured in `hardhat.config.ts`:

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy-token.ts --network sepolia

# Deploy to Goerli testnet
npx hardhat run scripts/deploy-token.ts --network goerli

# Deploy to Ethereum mainnet (use with caution)
npx hardhat run scripts/deploy-token.ts --network mainnet
``` 