// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleNFT
 * @dev A simple NFT contract with minting capabilities
 */
contract SimpleNFT is ERC721URIStorage, Ownable {
    // Token ID counter
    uint256 private _nextTokenId;
    
    // Maximum supply of NFTs
    uint256 public maxSupply = 1000;
    
    // Mapping to track URI to prevent duplicates
    mapping(string => bool) private _usedTokenURIs;
    
    // Event for when a new NFT is minted
    event NFTMinted(address to, uint256 tokenId, string tokenURI);
    
    /**
     * @dev Constructor for the NFT contract
     */
    constructor() ERC721("Simple NFT", "SNFT") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new NFT
     * @param to The address that will own the minted token
     * @param tokenURI The URI for token metadata
     * @return The ID of the newly minted token
     */
    function mintNFT(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        require(!_usedTokenURIs[tokenURI], "Token URI already used");
        require(_nextTokenId < maxSupply, "Maximum supply reached");
        
        // Increment token ID counter
        uint256 newTokenId = _nextTokenId++;
        
        // Mint the token
        _mint(to, newTokenId);
        
        // Set the token URI
        _setTokenURI(newTokenId, tokenURI);
        
        // Mark URI as used
        _usedTokenURIs[tokenURI] = true;
        
        emit NFTMinted(to, newTokenId, tokenURI);
        
        return newTokenId;
    }
    
    /**
     * @dev Update the maximum supply of NFTs
     * @param newMaxSupply The new maximum supply
     */
    function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
        require(newMaxSupply >= _nextTokenId, "New max supply must be >= current token count");
        maxSupply = newMaxSupply;
    }
    
    /**
     * @dev Get the total number of NFTs minted
     * @return The total number of NFTs minted
     */
    function getTotalMinted() public view returns (uint256) {
        return _nextTokenId;
    }
} 