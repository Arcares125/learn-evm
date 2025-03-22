// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleToken
 * @dev A simple ERC20 token with minting capability
 */
contract SimpleToken is ERC20, Ownable {
    // Define decimal places (standard is 18)
    uint8 private _decimals = 18;
    
    /**
     * @dev Constructor that gives the msg.sender an initial supply of tokens
     * @param initialSupply The initial token supply
     */
    constructor(
        uint256 initialSupply
    ) ERC20("Simple Token", "STK") Ownable(msg.sender) {
        // Mint initial supply to the contract creator
        _mint(msg.sender, initialSupply * (10 ** _decimals));
    }
    
    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint
     * @return A boolean that indicates if the operation was successful
     */
    function mint(address to, uint256 amount) public onlyOwner returns (bool) {
        _mint(to, amount);
        return true;
    }
    
    /**
     * @dev Returns the number of decimals used to get its user representation
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
} 