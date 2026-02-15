import { apiLikes } from '../api/api-likes';
import { queryClient } from '../lib/query-client';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { feedKeys } from './use-feeds';
import { postsKeys } from './use-posts';
import { mePostskeys } from './use-my-profile';
import { savedPostKeys } from './use-saves';
import { toast } from 'sonner';

export const likesKeys = {
  all: ['likes'] as const,
  list: (postId: number) => [...likesKeys.all, postId] as const,
};

export const meLikesKeys = {
  all: ['meLikes'] as const,
};

export const usePostLike = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiLikes.postLike(postId);
    },

    onSuccess: () => {
      toast.success('Liked');
      queryClient.invalidateQueries({ queryKey: likesKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postsKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
      queryClient.invalidateQueries({ queryKey: meLikesKeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },

    onError: () => {
      toast.error('Failed to like');
    },
  });
};

export const useDeleteLike = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiLikes.deleteLike(postId);
    },

    onSuccess: () => {
      toast.success('Unliked');
      queryClient.invalidateQueries({ queryKey: likesKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postsKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
      queryClient.invalidateQueries({ queryKey: meLikesKeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },

    onError: () => {
      toast.error('Failed to unlike');
    },
  });
};

export const useLikes = (postId: number) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: likesKeys.list(postId),

    queryFn: ({ pageParam }) => {
      const params = {
        id: postId,
        page: pageParam,
        limit: 20,
      };

      return apiLikes.getPostLikes(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const useMeLikes = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: meLikesKeys.all,

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiLikes.getMeLikes(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};
