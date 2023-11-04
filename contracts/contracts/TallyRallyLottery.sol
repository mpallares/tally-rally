// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TallyRallyLottery is ERC20 {
  event LotteryEntry(address indexed player);

  constructor() ERC20('MAYBE', 'MAYB') {}

  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }

  function play() external returns (bool didWin) {
    uint256 balance = balanceOf(msg.sender);
    uint256 approvalAmount = this.allowance(msg.sender, address(this));

    require(balance >= 1, 'Not enough tokens');
    require(approvalAmount >= 1, 'No token spending approval');

    // burn the token
    require(ERC20(address(this)).transferFrom(msg.sender, address(0), 1), 'Transfer failed');

    // Emit an event that a player has entered
    emit LotteryEntry(msg.sender);

    // 30% chance to win
    didWin = random() < 30;
  }

  // Simple pseudo-random number generator
  // WARNING: This is not secure and can be manipulated by miners
  // For a production contract, use a verifiably random function (VRF) like Chainlink VRF
  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender))) % 100;
  }
}
