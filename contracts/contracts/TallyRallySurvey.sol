// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TallyRallySurvey {
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

  uint256 public currentSurveyId;

  mapping(uint256 => Survey) public surveys;

  event SurveyCreated(uint256 id, address dataBuyer, SurveyType surveyType, string content);
  event SurveyAnswered(
    uint256 id,
    address dataBuyer,
    SurveyType surveyType,
    string content,
    string answerCid
  );

  constructor() {}

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
}
