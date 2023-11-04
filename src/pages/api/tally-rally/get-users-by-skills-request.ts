import { processRequest } from '../../utils/graphql';


export const getUsersBySkillsRequest = (
  chainId: number,
  numberPerPage?: number,
  offset?: number,
  searchQuery?: string,
): Promise<any> => {
  
  return processRequest(chainId, query);
};
