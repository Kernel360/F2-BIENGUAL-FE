import { useQuery } from '@tanstack/react-query';

import { SearchResponse } from '@/types/Search';

import { fetchSearchResults } from '../queries/searchQuries';

export const useFetchSearchResults = (query: string) => {
  return useQuery<SearchResponse>({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query),
  });
};
