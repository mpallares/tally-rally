// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TallyRallyLottery} from './TallyRallyLottery.sol';

contract TallyRallySurvey {
  uint256 surveyPrice = 0.01 ether;

  enum SurveyType {
    ADVERTISMENT,
    RESEARCH
  }

  struct Survey {
    uint256 id;
    address dataBuyer;
    SurveyType surveyType;
    string content;
  }

  uint256 currentSurveyId;

  mapping(uint256 => Survey) surveys;

  event SurveyCreated(uint256 id, address dataBuyer, SurveyType surveyType, string content);

  constructor() {}

  function createSurvey(SurveyType surveyType, string memory content) public payable {
    require(msg.value == surveyPrice, 'msg.value != surveyPrice');

    Survey memory survey = Survey({
      id: currentSurveyId,
      dataBuyer: msg.sender,
      surveyType: surveyType,
      content: content
    });

    surveys[currentSurveyId] = survey;

    currentSurveyId += 1;

    emit SurveyCreated(survey.id, survey.dataBuyer, survey.surveyType, survey.content);
  }
}
