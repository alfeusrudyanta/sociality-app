import { apiSaves } from '@/api/api-saves';
import { queryClient } from '@/lib/query-client';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

export const savedPostKeys = {
  all: ['saved'] as const,
};

export const usePostSave = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiSaves.postSave(postId);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },
  });
};

export const useDeleteSave = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiSaves.deleteSave(postId);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },
  });
};

export const useSave = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: savedPostKeys.all,

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiSaves.getMeSavedPosts(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};
