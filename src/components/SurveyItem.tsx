import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import tallyrallyContract from '../contracts/ABI/TallyRallyCombined.json';
import Loading from './Loading';
import { useConfig } from '../hooks/useConfig';

function SurveyItem({ survey }: any) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const config = useConfig();

  function onSelectAnswer(answer: string) {
    setSelectedAnswer(answer);
  }

  const { writeAsync } = useContractWrite({
    abi: tallyrallyContract.abi,
    address: config?.contracts.tallyRallyCombined,
    functionName: 'answerSurveyMintTokenForOwner',
    args: [survey.id, selectedAnswer],
  });

  async function onMint() {
    if (!selectedAnswer) return;

    try {
      setIsLoading(true);
      await writeAsync();
      console.log('Successfully send answer and minted $MAYBE');
    } catch (error: any) {
      console.log(`Failed to mint: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const { id, dataBuyer, surveyType, content, answerCids } = survey;

  const isAd = surveyType === 0;

  // const surveyTypeFull = isAd ? 'Advertisement' : 'Survey';

  return (
    <>
      <div className='flex flex-row gap-2 p-4 border  text-trblue bg-white'>
        <div className='flex flex-col items-top justify-between w-full'>
          <div className='flex flex-col justify-start items-start gap-4'>
            <div className='flex items-center justify-start mb-4'>
              <div className='flex flex-col'>
                {isAd ? (
                  <img src={content} alt={`advertisement-id`} />
                ) : (
                  <p className='text-trblue text-3xl text-xl break-all italic  mb-6'>{content}</p>
                )}
                {/* <p className='text-lg text-black'>{userDescription?.title || '-'}</p> */}
              </div>
            </div>
          </div>
          {/* <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} /> */}
          <div className='flex flex-col gap-4 items-center mb-4'>
            <div className='flex flex-col gap-4 items-center mb-4'>
              <button
                className={`${
                  selectedAnswer === 'like' || selectedAnswer === 'yes'
                    ? 'bg-trblue border-white text-white'
                    : ''
                } text-trblue-500 font-black border border-blue-500 hover:border-white hover:bg-trblue hover:text-white w-full px-6 py-3 rounded-full text-lg flex items-center justify-center transition-all`}
                onClick={() => onSelectAnswer(isAd ? 'like' : 'yes')}>
                {isAd ? 'Like' : 'Yes'}
              </button>
              <button
                className={`${
                  selectedAnswer === "don't like" || selectedAnswer === 'no'
                    ? 'bg-trblue border-white text-white'
                    : ''
                } text-trblue-500 border font-black border-blue-500 hover:border-white hover:bg-trblue hover:text-white w-full px-6 py-3 rounded-full text-lg flex items-center justify-center transition-all`}
                onClick={() => onSelectAnswer(isAd ? "don't like" : 'no')}>
                {isAd ? "Don't like" : 'No'}
              </button>
            </div>
          </div>

          <div className='flex flex-row gap-4 justify-end items-center'>
            <button
              className='uppercase bg-trgreen px-5 py-2.5 rounded-xl items-center text-lg'
              onClick={onMint}>
              {isLoading ? <Loading /> : 'Mint'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SurveyItem;
