import { apiFollow } from '@/api/api-follow';
import { queryClient } from '@/lib/query-client';
import {
  useInfiniteQuery,
  useMutation,
  type InfiniteData,
} from '@tanstack/react-query';
import { userLikesKeys, userProfileKeys } from './use-users';
import { toast } from 'sonner';
import { feedKeys } from './use-feeds';
import { meProfilekeys } from './use-my-profile';
import type {
  GetUserFollowersResponse,
  GetUserFollowingResponse,
} from '@/types/api-follow';

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

function updateFollowInInfiniteList(
  old:
    | InfiniteData<GetUserFollowersResponse | GetUserFollowingResponse, unknown>
    | undefined,
  username: string,
  isFollowedByMe: boolean
) {
  if (!old) return old;

  return {
    ...old,

    pages: old.pages.map((page) => ({
      ...page,
      data: {
        ...page.data,
        users: page.data.users.map((u) =>
          u.username === username ? { ...u, isFollowedByMe } : u
        ),
      },
    })),
  };
}

export const usePostFollow = (username: string) => {
  return useMutation({
    mutationFn: () => apiFollow.postFollow(username),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: followersKeys.all });
      await queryClient.cancelQueries({ queryKey: followingKeys.all });

      const prevFollowers = queryClient.getQueryData(
        followersKeys.list(username)
      );
      const prevFollowing = queryClient.getQueryData(
        followingKeys.list(username)
      );

      queryClient.setQueriesData<InfiniteData<GetUserFollowersResponse>>(
        { queryKey: followersKeys.all },
        (old) => updateFollowInInfiniteList(old, username, true)
      );

      queryClient.setQueriesData<InfiniteData<GetUserFollowingResponse>>(
        { queryKey: followingKeys.all },
        (old) => updateFollowInInfiniteList(old, username, true)
      );

      return { prevFollowers, prevFollowing };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followersKeys.list(username),
      });
      queryClient.invalidateQueries({
        queryKey: followingKeys.list(username),
      });
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.list(username),
      });
      queryClient.invalidateQueries({
        queryKey: userLikesKeys.list(username),
      });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      toast.success('Followed');
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevFollowers) {
        queryClient.setQueryData(
          followersKeys.list(username),
          ctx.prevFollowers
        );
      }
      if (ctx?.prevFollowing) {
        queryClient.setQueryData(
          followingKeys.list(username),
          ctx.prevFollowing
        );
      }
      toast.error('Failed to Follow');
    },
  });
};

export const useDeleteFollow = (username: string) => {
  return useMutation({
    mutationFn: () => apiFollow.deleteFollow(username),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: followersKeys.all });
      await queryClient.cancelQueries({ queryKey: followingKeys.all });

      const prevFollowers = queryClient.getQueryData(
        followersKeys.list(username)
      );
      const prevFollowing = queryClient.getQueryData(
        followingKeys.list(username)
      );

      queryClient.setQueriesData<InfiniteData<GetUserFollowersResponse>>(
        { queryKey: followersKeys.all },
        (old) => updateFollowInInfiniteList(old, username, false)
      );

      queryClient.setQueriesData<InfiniteData<GetUserFollowingResponse>>(
        { queryKey: followingKeys.all },
        (old) => updateFollowInInfiniteList(old, username, false)
      );

      return { prevFollowers, prevFollowing };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followersKeys.list(username),
      });
      queryClient.invalidateQueries({
        queryKey: followingKeys.list(username),
      });
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.list(username),
      });
      queryClient.invalidateQueries({
        queryKey: userLikesKeys.list(username),
      });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      toast.success('Unfollowed');
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevFollowers) {
        queryClient.setQueryData(
          followersKeys.list(username),
          ctx.prevFollowers
        );
      }
      if (ctx?.prevFollowing) {
        queryClient.setQueryData(
          followingKeys.list(username),
          ctx.prevFollowing
        );
      }
      toast.error('Failed to unfollow');
    },
  });
};

export const useGetFollowers = (username: string) => {
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

export const useGetFollowing = (username: string) => {
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

export const useGetMeFollowers = () => {
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

export const useGetMeFollowing = () => {
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
