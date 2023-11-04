// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TallyRallyLottery} from './TallyRallyLottery.sol';

contract TallyRally is TallyRallyLottery {
  constructor() TallyRallyLottery() {}
}
