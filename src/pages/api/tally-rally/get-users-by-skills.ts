import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersBySkillsRequest } from './get-users-by-skills-request';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chainId, searchQuery } = req.query;

  let numberPerPage = 1000;
  let offset = 0;

  let response = await getUsersBySkillsRequest(
    parseInt(chainId as string),
    numberPerPage,
    offset,
    searchQuery as string,
  );

  if (response) {
    return res.status(200).json(response.data);
  }

  return res.status(500);
}
