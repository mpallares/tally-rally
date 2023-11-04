// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TallyRallyLottery} from './TallyRallyLottery.sol';
import {TallyRallySurvey} from './TallyRallySurvey.sol';
import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TallyRally is TallyRallyLottery, TallyRallySurvey {
  address public owner;
  uint256 surveyPrice = 0.01 ether;

  TallyRallySurvey private tallyRallySurvey;
  TallyRallyLottery private tallyRallyLottery;

  event LotteryWin(address indexed winner, uint256 amount);

  constructor() TallyRallyLottery() TallyRallySurvey() {
    owner = msg.sender;

    tallyRallySurvey = new TallyRallySurvey();
    tallyRallyLottery = new TallyRallyLottery();
  }

  function createSurveyForBuyer(SurveyType surveyType, string memory content) public payable {
    require(msg.value == surveyPrice, 'msg.value != surveyPrice');

    tallyRallySurvey.createSurvey(surveyType, content);
  }

  function answerSurveyMintTokenForOwner(uint256 id, string memory answerCid) public {
    // TODO: How to validate user is allowed to answer survey

    // call TallyRallySurvey's answerSurvey function
    tallyRallySurvey.answerSurvey(id, answerCid);

    // mint one token to the sender
    tallyRallyLottery.mint(msg.sender, 1);
  }

  function playLottery() public {
    // call TallyRallyLottery's playLottery function
    bool didWin = tallyRallyLottery.play();

    if (didWin) {
      uint256 prizeAmount = balanceOf(address(this));
      emit LotteryWin(msg.sender, prizeAmount);

      // Transfer the prize to the winner
      require(ERC20(address(this)).transfer(msg.sender, prizeAmount), 'Prize transfer failed');
    }
  }
}
