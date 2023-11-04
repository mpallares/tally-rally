import Link from 'next/link';
import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useUserById from '../hooks/useUserById';
import { IUser } from '../types';
import Loading from './Loading';
import Stars from './Stars';

function UserItem({ user }: { user?: IUser }) {
  const { user: currentUser } = useContext(TalentLayerContext);
  const userDescription = user?.id ? useUserById(user?.id)?.description : null;

  // if (!user?.id) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className='flex flex-row gap-2 p-4 border  text-trblue bg-white'>
        <div className='flex flex-col items-top justify-between w-full'>
          <div className='flex flex-col justify-start items-start gap-4'>
            <div className='flex items-center justify-start mb-4'>
              <div className='flex flex-col'>
                <p className='text-trblue text-3xl  text-xl break-all italic  mb-6'>
                  {'How do you perceive the long-term value of NFTs in your portfolio?'}
                </p>
                {/* <p className='text-lg text-black'>{userDescription?.title || '-'}</p> */}
              </div>
            </div>
          </div>
          {/* <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} /> */}
          <div className='flex flex-col gap-4 items-center mb-4'>
            <div className='flex flex-col gap-4 items-center mb-4'>
              <Link
                className='text-trblue-500  font-black border border-blue-500 hover:border-white hover:bg-trblue hover:text-white w-full px-6 py-3 rounded-full text-lg flex items-center justify-center transition-all'
                href={'test'}>
                Appreciating Assets: They will grow in value.
              </Link>
              <Link
                className='text-trblue-500 border font-black border-blue-500 hover:border-white hover:bg-trblue hover:text-white w-full px-6 py-3 rounded-full text-lg flex items-center justify-center transition-all'
                href={`test`}>
                Artistic Value: They're for creative support.
              </Link>
            </div>
          </div>

          <div className='flex flex-row gap-4 justify-end items-center'>
            <Link
              className='uppercase bg-trgreen px-5 py-2.5 rounded-xl items-center text-lg'
              href={'test'}>
              Mint
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-2 p-4 border  text-trblue bg-white'>
        <div className='flex flex-col items-top justify-between w-full'>
          <div className='flex flex-col justify-start items-start gap-4'>
            <div className='flex items-center justify-start mb-4'>
              <div className='flex flex-col'>
                <p className='text-trblue text-3xl font-size:24 italic font-medium break-all mb-6'>
                  {'What drives your participation in DeFi platforms?'}
                </p>
                {/* <p className='text-lg text-black'>{userDescription?.title || '-'}</p> */}
              </div>
            </div>
          </div>
          {/* <Stars rating={Number(user.rating)} numReviews={user.userStats.numReceivedReviews} /> */}
          <div className='flex flex-col gap-4 items-center mb-4'>
            <div className='flex flex-col gap-4 items-center mb-4'>
              <Link
                className='text-trblue-500 font-black border border-blue-500 hover:border-white hover:bg-trblue hover:text-white w-full px-6 py-3 rounded-full text-lg flex items-center justify-center transition-all'
                href={'test'}>
                High Returns: Seeking better yields than tradfi.
              </Link>
              <Link
                className='text-trblue-500 font-black  border border-blue-500 hover:border-white hover:bg-trblue hover:text-white w-full px-6 py-3 rounded-full text-lg flex items-center justify-center transition-all'
                href={`test`}>
                Innovation Adoption: Interested in the tech.
              </Link>
            </div>
          </div>

          <div className='flex flex-row gap-4 justify-end items-center'>
            <Link
              className='uppercase bg-trgreen px-5 py-2.5 rounded-xl items-center text-lg'
              href={'test'}>
              Mint
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserItem;
