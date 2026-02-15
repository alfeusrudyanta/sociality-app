import { apiFollow } from '../api/api-follow';
import { queryClient } from '../lib/query-client';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { feedKeys } from './use-feeds';
import { meProfilekeys } from './use-my-profile';
import { userProfileKeys } from './use-users';

export const followingKeys = {
  all: ['following'] as const,
  list: (username: string) => [...followingKeys.all, username] as const,
};

export const followersKeys = {
  all: ['followers'] as const,
  list: (username: string) => [...followersKeys.all, username] as const,
};

export const meFollowersKeys = {
  all: ['meFollowers'] as const,
};

export const meFollowingKeys = {
  all: ['meFollowing'] as const,
};

export const usePostFollow = (username: string) => {
  return useMutation({
    mutationFn: () => apiFollow.postFollow(username),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.list(username),
      });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      toast.success('Followed');
    },

    onError: () => {
      toast.error('Failed to Follow');
    },
  });
};

export const useDeleteFollow = (username: string) => {
  return useMutation({
    mutationFn: () => apiFollow.deleteFollow(username),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.list(username),
      });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      toast.success('Unfollowed');
    },

    onError: () => {
      toast.error('Failed to unfollow');
    },
  });
};

export const useFollowers = (username: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: followersKeys.list(username),

    queryFn: ({ pageParam }) => {
      const params = {
        username,
        page: pageParam,
        limit: 20,
      };

      return apiFollow.getUserFollowers(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const useFollowing = (username: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: followingKeys.list(username),

    queryFn: ({ pageParam }) => {
      const params = {
        username,
        page: pageParam,
        limit: 20,
      };

      return apiFollow.getUserFollowing(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const useMeFollowers = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: meFollowersKeys.all,

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiFollow.getMeFollowers(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const useMeFollowing = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: meFollowingKeys.all,

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiFollow.getMeFollowing(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};
