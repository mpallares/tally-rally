// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TallyRallyCombined is ERC20 {
  address public owner;
  uint256 surveyPrice = 0.01 ether;

  event LotteryWin(address indexed winner, uint256 amount);

  enum SurveyType {
    ADVERTISMENT,
    RESEARCH
  }

  struct Survey {
    uint256 id;
    address dataBuyer;
    SurveyType surveyType;
    string content;
    string[] answerCids;
  }

  uint256 currentSurveyId;

  mapping(uint256 => Survey) surveys;

  event SurveyCreated(uint256 id, address dataBuyer, SurveyType surveyType, string content);
  event SurveyAnswered(
    uint256 id,
    address dataBuyer,
    SurveyType surveyType,
    string content,
    string answerCid
  );

  event LotteryEntry(address indexed player);

  constructor() ERC20('MAYBE', 'MAYB') {
    owner = msg.sender;
  }

  function createSurveyForBuyer(SurveyType surveyType, string memory content) public payable {
    require(msg.value == surveyPrice, 'msg.value != surveyPrice');

    this.createSurvey(surveyType, content);
  }

  function answerSurveyMintTokenForOwner(uint256 id, string memory answerCid) public {
    // TODO: How to validate user is allowed to answer survey

    // call TallyRallySurvey's answerSurvey function
    this.answerSurvey(id, answerCid);

    // mint one token to the sender
    this.mint(msg.sender, 1);
  }

  function playLottery() public {
    // call TallyRallyLottery's playLottery function
    bool didWin = this.play();

    if (didWin) {
      uint256 prizeAmount = this.balanceOf(address(this));
      emit LotteryWin(msg.sender, prizeAmount);

      // Transfer the prize to the winner
      require(ERC20(address(this)).transfer(msg.sender, prizeAmount), 'Prize transfer failed');
    }
  }

  function createSurvey(SurveyType surveyType, string memory content) public {
    string[] memory answerCids = new string[](0);

    Survey memory survey = Survey({
      id: currentSurveyId,
      dataBuyer: msg.sender,
      surveyType: surveyType,
      content: content,
      answerCids: answerCids
    });

    surveys[currentSurveyId] = survey;

    currentSurveyId += 1;

    emit SurveyCreated(survey.id, survey.dataBuyer, survey.surveyType, survey.content);
  }

  function answerSurvey(uint256 id, string memory answerCid) public {
    Survey storage survey = surveys[id];
    survey.answerCids.push(answerCid);

    emit SurveyAnswered(survey.id, survey.dataBuyer, survey.surveyType, survey.content, answerCid);
  }

  function getSurveys() public view returns (Survey[] memory) {
    Survey[] memory allSurveys = new Survey[](currentSurveyId);

    for (uint256 i = 0; i < currentSurveyId; i++) {
      allSurveys[i] = surveys[i];
    }

    return allSurveys;
  }

  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }

  function play() external returns (bool didWin) {
    uint256 balance = this.balanceOf(msg.sender);
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
