# 🚀 EVM Blockchain Learning Project

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-Latest-yellow.svg)](https://hardhat.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A comprehensive project designed to help you learn Ethereum blockchain development through practical examples.

<p align="center">
  <img src="https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/9019e/hero.webp" alt="Ethereum" width="400"/>
</p>

## 📚 What is EVM?

The Ethereum Virtual Machine (EVM) is a computation engine that acts as a decentralized computer with millions of executable projects. It's the environment in which all Ethereum accounts and smart contracts live.

## 🛠️ Project Setup

### Prerequisites
- Node.js (v14+) and npm
- Git
- A code editor (VS Code recommended)

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd evm
```

2. Install dependencies:
```bash
npm install
```

## 📋 Tools/Libraries Used

| Tool/Library | Purpose |
|--------------|---------|
| **Hardhat** | Ethereum development environment |
| **Ethers.js** | Library for interacting with the Ethereum blockchain |
| **OpenZeppelin** | Library for secure smart contract development |
| **Solidity** | Programming language for writing smart contracts |

## ⚙️ Commands

| Command | Description |
|---------|-------------|
| `npm init -y` | Initialize project |
| `npx hardhat compile` | Compile contracts |
| `npx hardhat test` | Run tests |
| `npx hardhat node` | Start local blockchain |
| `npx hardhat run scripts/deploy-*.ts --network localhost` | Deploy contracts |

## 📁 Folder Structure

```
evm/
├── contracts/             # Smart contract source files
│   ├── SimpleToken.sol    # ERC20 token implementation
│   ├── SimpleVoting.sol   # Voting contract
│   └── SimpleNFT.sol      # NFT contract (ERC721)
├── scripts/               # Deployment and interaction scripts
├── test/                  # Test files for smart contracts
├── docs/                  # Documentation
├── hardhat.config.ts      # Hardhat configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## ✨ Features

<table>
  <tr>
    <td align="center"><b>🪙 Token Contract</b></td>
    <td>A simple ERC20 token implementation with minting capability</td>
  </tr>
  <tr>
    <td align="center"><b>🗳️ Voting System</b></td>
    <td>A basic decentralized voting mechanism</td>
  </tr>
  <tr>
    <td align="center"><b>🖼️ NFT Contract</b></td>
    <td>A simple NFT (ERC721) implementation with metadata</td>
  </tr>
</table>

## 🧪 Testing & Deployment Approach

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

## 🔐 Environment Setup

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

## 🌐 Deploying to Testnet or Mainnet

After configuring your environment variables, you can deploy to any network configured in `hardhat.config.ts`:

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy-token.ts --network sepolia

# Deploy to Goerli testnet
npx hardhat run scripts/deploy-voting.ts --network goerli

# Deploy to Ethereum mainnet (use with caution)
npx hardhat run scripts/deploy-nft.ts --network mainnet
```

## 📝 Learning Path

1. **Basics of Blockchain**: Understand the fundamentals
2. **Solidity Programming**: Learn the language for smart contracts
3. **Smart Contract Deployment**: Put your contracts on a blockchain
4. **Contract Interaction**: Learn to communicate with deployed contracts
5. **Advanced Topics**: Security, gas optimization, upgradability

## ❓ Quiz

<details>
<summary>Test your knowledge with these questions</summary>
<br>

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
</details>

## 🔜 Next Steps

After completing this learning project, consider:
- Building a DApp (Decentralized Application)
- Learning about Layer 2 solutions
- Exploring DeFi (Decentralized Finance) protocols
- Contributing to open-source blockchain projects

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ for blockchain enthusiasts
</p> 