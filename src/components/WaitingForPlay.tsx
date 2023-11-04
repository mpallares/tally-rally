import { useContractWrite, useWalletClient, useContractEvent } from 'wagmi';
import { useConfig } from '../hooks/useConfig';
import TallyRallyCombined from '../contracts/ABI/TallyRallyCombined.json';
import { useEffect } from 'react';
import { useChainId } from '../hooks/useChainId';

interface WaitingForPlayProps {
    setRaceState: any;
}

function WaitingForPlay({setRaceState}: WaitingForPlayProps) {
    const config = useConfig();
    const chainId = useChainId();
    const { data: walletClient } = useWalletClient({
        chainId,
    });

    useContractEvent({
        address: config.contracts.tallyRallyCombined,
        abi: TallyRallyCombined.abi,
        eventName: 'LotteryWin',
        listener(log) {
          setRaceState('won');
        },
      })
    
    useEffect(() => {
        walletClient.writeContract({
            address: config.contracts.tallyRallyCombined,
            abi: TallyRallyCombined.abi,
            functionName: 'playLottery',
            account: walletClient.address
        }).then((tx) => {
            setTimeout(() => {
                setRaceState('lose')
            }, 45000)
            console.log("tx - play",tx);
            setRaceState('won');
            // setRaceState('lose');

        });    
    }, [])

    return (
        <p>Waiting for approval</p>
    );
}

export default WaitingForPlay;
