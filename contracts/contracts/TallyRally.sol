// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TallyRallyLottery} from './TallyRallyLottery.sol';
import {TallyRallySurvey} from './TallyRallySurvey.sol';

contract TallyRally is TallyRallyLottery, TallyRallySurvey {
  address public owner;

  TallyRallySurvey private tallyRallySurvey;
  TallyRallyLottery private tallyRallyLottery;

  constructor() TallyRallyLottery() TallyRallySurvey() {
    owner = msg.sender;

    tallyRallySurvey = new TallyRallySurvey();
    tallyRallyLottery = new TallyRallyLottery();
  }

  function answerSurveyMintToken(uint256 id, string memory answerCid) public {
    // TODO: How to validate user is allowed to answer survey

    // call TallyRallySurvey's answerSurvey function
    tallyRallySurvey.answerSurvey(id, answerCid);

    // mint one token to the sender
    tallyRallyLottery.mint(msg.sender, 1);
  }
}
