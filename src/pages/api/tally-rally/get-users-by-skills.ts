import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let query = `
        query UsersBySkills($searchQuery: String!) {
        users(where: { description_: { skills_raw_contains: $searchQuery } }) {
            id
            handle
            address
            description {
            skills_raw
            }
        }
    }
    `;
}
