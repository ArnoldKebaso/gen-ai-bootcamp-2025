import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { Word } from '../api/types';

export const useWords = (page: number = 1, sortBy: string = 'kanji', order: string = 'asc') => {
  return useQuery<Word[]>({
    queryKey: ['words', page, sortBy, order],
    queryFn: async () => {
      const { data } = await api.get('/words', {
        params: { page, sort_by: sortBy, order }
      });
      return data;
    },
  });
};