import { NextApiRequest, NextApiResponse } from 'next';
import TalentLayerService from '../../../contracts/ABI/TalentLayerService.json';
import { getServiceSignature } from '../../../utils/signature';
import { getDelegationSigner, isPlatformAllowedToDelegate } from '../utils/delegate';
import { getConfig } from '../../../config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, userAddress, cid, chainId } = req.body;
  const config = getConfig(chainId);

  // @dev : you can add here all the check you need to confirm the delagation for a user
  //   await isPlatformAllowedToDelegate(chainId, userAddress, res);

  try {
    const walletClient = await getDelegationSigner(res);
    if (!walletClient) {
      return;
    }

    console.log('here');

    res.status(200).json({ success: true });

    // const signature = await getServiceSignature({ profileId: Number(userId), cid });
    // const transaction = await walletClient.writeContract({
    //   address: config.contracts.serviceRegistry,
    //   abi: TalentLayerService.abi,
    //   functionName: 'createService',
    //   args: [userId, process.env.NEXT_PUBLIC_PLATFORM_ID, cid, signature],
    // });

    // res.status(200).json({ transaction: transaction });
  } catch (error) {
    console.error('errorDebug', error);
    res.status(500).json('tx failed');
  }
}
