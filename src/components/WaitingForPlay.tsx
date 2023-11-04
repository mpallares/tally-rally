import { useContractWrite, useWalletClient } from 'wagmi';
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
    
    useEffect(() => {
        walletClient.writeContract({
            address: config.contracts.tallyRallyCombined,
            abi: TallyRallyCombined.abi,
            functionName: 'playLottery',
            account: walletClient.address
        }).then((tx) => {
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
