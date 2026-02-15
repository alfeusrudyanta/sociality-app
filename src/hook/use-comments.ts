import { apiComments } from '../api/api-comments';
import { queryClient } from '../lib/query-client';
import type {
  GetCommentsResponse,
  PostCommentRequest,
} from '../types/api-comments';
import type { Comment } from '../types/api';
import {
  useInfiniteQuery,
  useMutation,
  type InfiniteData,
} from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectProfile } from '../store/slices/profile-slice';
import { feedKeys } from './use-feeds';
import { postsKeys } from './use-posts';
import { mePostskeys } from './use-my-profile';
import { savedPostKeys } from './use-saves';
import { toast } from 'sonner';

export const commentsKeys = {
  all: ['comments'] as const,
  list: (postId: number) => [...commentsKeys.all, postId] as const,
};

export const useComments = (postId: number) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: commentsKeys.list(postId),

    queryFn: ({ pageParam }) => {
      const params = {
        id: postId,
        page: pageParam,
        limit: 10,
      };

      return apiComments.getComments(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};

export const usePostComment = (postId: number) => {
  const profile = useSelector(selectProfile);

  return useMutation({
    mutationFn: (data: PostCommentRequest) =>
      apiComments.postComment(postId, data),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.list(postId),
      });

      const previousData = queryClient.getQueryData<
        InfiniteData<GetCommentsResponse>
      >(commentsKeys.list(postId));

      queryClient.setQueryData<InfiniteData<GetCommentsResponse>>(
        commentsKeys.list(postId),
        (old) => {
          if (!old) return old;

          const optimisticComment: Comment = {
            id: Date.now(),
            text: variables.text,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            author: {
              id: profile.id,
              name: profile.name,
              username: profile.username,
              avatarUrl: profile.avatarUrl,
            },
          };

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    data: {
                      ...page.data,
                      comments: [optimisticComment, ...page.data.comments],
                      pagination: {
                        ...page.data.pagination,
                        total: page.data.pagination.total + 1,
                      },
                    },
                  }
                : page
            ),
          };
        }
      );

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      toast.error('Failed to post comment');
      if (context?.previousData) {
        queryClient.setQueryData(
          commentsKeys.list(postId),
          context.previousData
        );
      }
    },

    onSuccess: () => {
      toast.success('Comment posted');
      queryClient.invalidateQueries({
        queryKey: commentsKeys.list(postId),
      });
      queryClient.invalidateQueries({ queryKey: postsKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },
  });
};

export const useDeleteComment = (postId: number) => {
  return useMutation({
    mutationFn: (commentId: number) => apiComments.deleteComment(commentId),

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: commentsKeys.list(postId),
      });

      const previousData = queryClient.getQueryData<
        InfiniteData<GetCommentsResponse>
      >(commentsKeys.list(postId));

      queryClient.setQueryData<InfiniteData<GetCommentsResponse>>(
        commentsKeys.list(postId),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                comments: page.data.comments.filter(
                  (comment) => comment.id !== commentId
                ),
                pagination: {
                  ...page.data.pagination,
                  total: page.data.pagination.total - 1,
                },
              },
            })),
          };
        }
      );

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      toast.error('Failed to delete comment');
      if (context?.previousData) {
        queryClient.setQueryData(
          commentsKeys.list(postId),
          context.previousData
        );
      }
    },

    onSuccess: () => {
      toast.success('Comment deleted');
      queryClient.invalidateQueries({
        queryKey: commentsKeys.list(postId),
      });
      queryClient.invalidateQueries({ queryKey: postsKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },
  });
};
