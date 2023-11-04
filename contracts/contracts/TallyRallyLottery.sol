// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TallyRallyLottery is ERC20 {
  address public owner;

  event LotteryEntry(address indexed player);
  event LotteryWin(address indexed winner, uint256 amount);

  constructor() ERC20('MAYBE', 'MAYB') {
    owner = msg.sender;
  }

  function play() external {
    uint256 balance = balanceOf(msg.sender);
    uint256 approvalAmount = this.allowance(msg.sender, address(this));

    require(balance >= 1, 'Not enough tokens');
    require(approvalAmount >= 1, 'No token spending approval');

    // burn the token
    require(ERC20(address(this)).transferFrom(msg.sender, address(0), 1), 'Transfer failed');

    // Emit an event that a player has entered
    emit LotteryEntry(msg.sender);

    // 10% chance to win
    if (random() < 30) {
      uint256 prizeAmount = balanceOf(address(this));

      // Transfer the prize to the winner
      require(ERC20(address(this)).transfer(msg.sender, prizeAmount), 'Prize transfer failed');

      emit LotteryWin(msg.sender, prizeAmount);
    }
  }

  // Simple pseudo-random number generator
  // WARNING: This is not secure and can be manipulated by miners
  // For a production contract, use a verifiably random function (VRF) like Chainlink VRF
  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender))) % 100;
  }
}
