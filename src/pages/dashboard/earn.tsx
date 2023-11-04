import { useRouter } from 'next/router';
import tallyrallyContract from '../../contracts/ABI/TallyRallyCombined.json';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import SurveyItem from '../../components/SurveyItem';

function Talents() {
  const router = useRouter();
  const query = router.query;

  const { address } = useAccount();

  const [surveys, setSurveys] = useState([]);

  const { refetch, data: surveyResult } = useContractRead({
    abi: tallyrallyContract.abi,
    address: '0xd05D1366471b120D30683eBBe1496191Af7E780d',
    functionName: 'getSurveys',
  });

  useEffect(() => {
    if (address) {
      refetch();

      if (surveyResult) {
        setSurveys(surveyResult as any);
      }
    }
  }, [address]);

  return (
    <div className='max-w-7xl mx-auto bg-black text-gray-200 sm:px-4 lg:px-0'>
      <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
        <p className='flex py-2 px-6 sm:px-0 items-center text-2xl font-medium tracking-wider mb-8 border-b w-full border-gray-700 md:px-8 '>
          <span className='text-gray-100 ml-1'>Earn</span>
        </p>
      </div>

      {/* <div className='flex justify-center items-center gap-10 flex-col pb-5'>
        <SearchTalentButton value={searchQuery} />
      </div> */}

      <div className='grid grid-cols-1 gap-4 p-10'>
        {surveys.map((survey, i) => {
          return <SurveyItem survey={survey} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Talents;
