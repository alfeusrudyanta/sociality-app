import { apiFeed } from '@/api/api-feeds';
import { useInfiniteQuery } from '@tanstack/react-query';

export const feedKeys = {
  all: ['feeds'] as const,
};

export const useFeeds = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: feedKeys.all,
    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiFeed.getFeed(params);
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};
