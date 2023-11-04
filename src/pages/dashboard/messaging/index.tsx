import { useContext } from 'react';
import { useWalletClient } from 'wagmi';
import Steps from '../../../components/Steps';
import TalentLayerContext from '../../../context/talentLayer';
import { useChainId } from '../../../hooks/useChainId';
import ConversationList from '../../../modules/Messaging/components/ConversationList';
import SearchModal from '../../../modules/Messaging/components/SearchModal';
import ShareModal from '../../../modules/Messaging/components/ShareModal';
import { XmtpContext } from '../../../modules/Messaging/context/XmtpContext';
import useStreamConversations from '../../../modules/Messaging/hooks/useStreamConversations';
import Image from 'next/image';

function MessagingIndex() {
  const chainId = useChainId();
  const { account, user } = useContext(TalentLayerContext);
  const { data: walletClient } = useWalletClient({
    chainId,
  });
  const { providerState } = useContext(XmtpContext);

  // Listens to new conversations ? ==> Yes, & sets them in "xmtp context". Stream stops "onDestroy"
  useStreamConversations();

  const handleXmtpConnect = async () => {
    if (providerState && providerState.initClient && walletClient) {
      await providerState.initClient();
    }
  };

  if (!user) {
    return <Steps />;
  }

  return (
    <div className='text-gray-900 sm:px-4 lg:px-0 h-full text-white'>
      {/* bg-[#070F12] */}

      {/* Let's rally line */}
      <div className='flex justify-between mt-[100px]'>
        <div>
          <Image
            src={'/images/lets-rally.svg'}
            width={600}
            height={36}
            alt='Car 1'
          />
        </div>
        <div className=''>
          <div className="w-[143px] h-[45px] px-4 py-1.5 border border-lime-400 justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-white text-[22px] font-bold font-['Kanit']">10 MATIC</div>
          </div>
          <div className="w-[123px] text-center text-lime-400 text-sm font-normal font-['Kanit'] leading-tight">Play to win</div>
        </div>
      </div>
      {/* Cars line */}
      <div className='relative mb-10 min-h-[300px]'>
        <Image
          src={'/images/RallyTrack.svg'}
          fill
          // height={200}
          objectFit='cover'
          alt='Rally Track'
        />

        <Image
          src={'/images/Car1.svg'}
          width={80}
          height={36}
          alt='Car 1'
          className='py-4 mr-[100%] absolute bottom-[80%]'
        />
        <Image
          src={'/images/Car2.svg'}
          width={80}
          height={36}
          alt='Car 2'
          className='py-4 z-2 mr-[100%] absolute bottom-[45%]'
        />
        <Image
          src={'/images/Car3.svg'}
          width={80}
          height={36}
          alt='Car 3'
          className='py-4 z-2 mr-[100%] absolute bottom-[10%]'
        />
      </div>
      {/* sub track */}
      <div className='flex justify-between'>
        <div>You're just 1 $MAYBE token away from the chance to win big! </div>
        <div className="w-[253px] h-[47px] px-[35px] py-2.5 bg-lime-400 rounded-[60px] border justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-blue-800 text-lg font-black font-['Kanit'] uppercase">ENTER race </div>
        </div>
      </div>
      {/* Table */}
      <div>
          <div className="w-full p-10 h-[344px] mt-10 left-0 bg-blue-800 pb-10">
            <div className="w-[525px] "><span className="text-white text-[28px] font-semibold font-['Kanit'] leading-normal">Take the Wheel! </span><span className="text-white text-[28px] font-bold font-['Kanit'] leading-normal">🚗 </span></div>
            <div className="w-[630px] pb-5"><span className="text-white text-sm font-light font-['Kanit'] leading-tight">Use your token to join the race with a 10% shot at speeding away with the entire accumulated jackpot. Will you take a spin on the fast track to fortune?<br/></span><span className="text-white text-sm font-semibold font-['Kanit'] leading-tight"><br/>Here’s how it works:<br/></span><span className="text-white text-sm font-light font-['Kanit'] leading-tight">Enter 1 $MAYBE to participate!<br/>You won the race? Awesome! Collect your winnings!<br/></span><span className="text-white text-sm font-light font-['Kanit'] leading-tight"><br/>Remember, every race is a new adventure and every click could be your ticket to the winner's circle. Start your engines... it's race time! (1 $MAYBE token required per play)</span></div>
          </div>
      </div>
    </div>
  );
}

export default MessagingIndex;
