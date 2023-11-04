import { processRequest } from '../../../utils/graphql';

export const getUsersBySkillsRequest = (
  chainId: number,
  numberPerPage?: number,
  offset?: number,
  searchQuery?: string,
): Promise<any> => {
  const pagination = numberPerPage ? 'first: ' + numberPerPage + ', skip: ' + offset : '';

  let query = `
    query {
        users(where: { description_: { skills_raw_contains: "${searchQuery}" } },
          first: ${numberPerPage}, orderBy: createdAt orderDirection: desc ${pagination}) {
            id
            handle
            address
            description {
                skills_raw
            }
            platform {
                id
                name
            }
        }
    }`;

  return processRequest(chainId, query);
};
