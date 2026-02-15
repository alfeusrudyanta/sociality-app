import { apiUsers } from '../api/api-users';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const userProfileKeys = {
  all: ['users'] as const,
  list: (username: string) => [...userProfileKeys.all, username] as const,
};

export const userLikesKeys = {
  all: ['userLikes'] as const,
  list: (username: string) => [...userLikesKeys.all, username] as const,
};

export const userPostsKeys = {
  all: ['userPosts'] as const,
  list: (username: string) => [...userPostsKeys.all, username] as const,
};

export const userSearchKeys = {
  all: ['userSearch'] as const,
  list: (q: string) => [...userSearchKeys.all, q] as const,
};

export const useUserLikes = (username: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: userLikesKeys.list(username),

    queryFn: ({ pageParam }) => {
      const params = {
        username,
        page: pageParam,
        limit: 20,
      };

      return apiUsers.getUserLikes(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const useUserPosts = (username: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: userPostsKeys.list(username),

    queryFn: ({ pageParam }) => {
      const params = {
        username,
        page: pageParam,
        limit: 20,
      };

      return apiUsers.getUserPosts(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const useUserSearch = (q: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: userSearchKeys.list(q),

    queryFn: ({ pageParam }) => {
      const params = {
        q,
        page: pageParam,
        limit: 5,
      };

      return apiUsers.getUserSearch(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },

    enabled: !!q,
  });
};

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: userProfileKeys.list(username),

    queryFn: () => {
      return apiUsers.getUserProfile(username);
    },
  });
};
