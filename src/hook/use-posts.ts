import { apiPosts } from '../api/api-posts';
import { queryClient } from '../lib/query-client';
import type { PostPostRequest } from '../types/api-posts';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { feedKeys } from './use-feeds';
import { mePostskeys, meProfilekeys } from './use-my-profile';
import { savedPostKeys } from './use-saves';
import { meLikesKeys } from './use-likes';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const postsKeys = {
  all: ['posts'] as const,
  list: (postId: number) => [...postsKeys.all, postId] as const,
};

export const usePosts = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: postsKeys.all,

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiPosts.getPosts(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const usePostPost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: PostPostRequest) => {
      return apiPosts.postPost(body);
    },

    onSuccess: () => {
      toast.success('Post created');
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      navigate('/');
    },

    onError: () => {
      toast.error('Failed to create post');
    },
  });
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: postsKeys.list(postId),

    queryFn: () => {
      return apiPosts.getPost(postId);
    },
  });
};

export const useDeletePost = (postId: number) => {
  return useMutation({
    mutationFn: () => {
      return apiPosts.deletePost(postId);
    },

    onSuccess: () => {
      toast.success('Post deleted');
      queryClient.invalidateQueries({ queryKey: postsKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
      queryClient.invalidateQueries({ queryKey: meLikesKeys.all });
    },

    onError: () => {
      toast.error('Failed to delete post');
    },
  });
};
