import { useContractWrite, useWalletClient } from 'wagmi';
import { useConfig } from '../hooks/useConfig';
import TallyRallyCombined from '../contracts/ABI/TallyRallyCombined.json';
import { useEffect } from 'react';
import { useChainId } from '../hooks/useChainId';

interface WaitingForApprovalProps {
    setRaceState: any;
}

function WaitingForApproval({setRaceState}: WaitingForApprovalProps) {
    const config = useConfig();
    const chainId = useChainId();
    const { data: walletClient } = useWalletClient({
        chainId,
    });
    
    useEffect(() => {
        walletClient.writeContract({
            address: config.contracts.tallyRallyCombined,
            abi: TallyRallyCombined.abi,
            functionName: 'approve',
            args: [config.contracts.tallyRallyCombined, 1],
            account: walletClient.address
        }).then((tx) => {
            console.log("tx - approve",tx);
            setRaceState('play');
        });    
    }, [])

    return (
        <p>Waiting for approval</p>
    );
}

export default WaitingForApproval;
