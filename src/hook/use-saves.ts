import { apiSaves } from '@/api/api-saves';
import { queryClient } from '@/lib/query-client';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const savedPostKeys = {
  all: ['saved'] as const,
};

export const usePostSave = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiSaves.postSave(postId);
    },

    onSuccess: () => {
      toast.success('Post saved');
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },

    onError: () => {
      toast.error('Failed to save post');
    },
  });
};

export const useDeleteSave = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiSaves.deleteSave(postId);
    },

    onSuccess: () => {
      toast.success('Post unsaved');
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },

    onError: () => {
      toast.error('Failed to unsave post');
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
