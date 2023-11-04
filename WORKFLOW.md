# TALLY-RALLY WORKFLOW

- as a user i can register

  - connect my wallet
  - create a TLid, setup skills
  - SIDECHAIN BELLECOUR => protect is email, and grant access to the platform (allow the publicKey to send email)

- as a dataBuyer i can create a Survey

  - owner
  - numbers of people he wants to rewards
  - amount (1$ per email)
  - token
  - send money to the contract
  - TalentLayer skills the user need to have answer the survey
  - questions
  - maxNumbersOfAnswers (open until 10 person answer)

- as a dataBuyer i want to send web3mail to TalentLayer matched by the skills

  - fetch all the users that matches skills and that shared the email
    - array of ethereum adresses
    - sendEmail of web3mail by address
      - fetchProtectedData => confirm that the user allow you to send an email, and get the protected data address
      - sendEmail(protectedData)

- as a user

  - receive an email
  - on the frontend, double check, that the conencted user match the skills
  - access the survey
  - answer the survey
    - need the data to be encrypted
    - json data containing answers encrypted with data protector
    - use grant access to survey owner address to this data (with data protector)
    - store on the smart contract only dataProtector address
    - receive $MAYBE token

- as a $MAYBE token holder, i can play the lottery and get immediate chance to win

  - Survey smart contract

- as a dataBuyer, at any time, i can access the statistics
  - call the iExec custom module and return the stats
