// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TallyRallyLottery} from './TallyRallyLottery.sol';
import {TallyRallySurvey} from './TallyRallySurvey.sol';

contract TallyRally is TallyRallyLottery, TallyRallySurvey {
  address public owner;

  constructor() TallyRallyLottery() TallyRallySurvey() {
    owner = msg.sender;
  }
}
