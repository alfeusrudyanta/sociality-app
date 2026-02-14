import { apiMe } from '@/api/api-my-profile';
import { queryClient } from '@/lib/query-client';
import type { PatchMeRequest } from '@/types/api-my-profile';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { feedKeys } from './use-feeds';
import { savedPostKeys } from './use-saves';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/store/slices/profile-slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const meProfilekeys = {
  all: ['meProfile'] as const,
};

export const mePostskeys = {
  all: ['mePosts'] as const,
};

export const useMe = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: meProfilekeys.all,

    queryFn: () => {
      return apiMe.getMe();
    },
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setProfile(query.data.data));
    }
  }, [query.data, dispatch]);

  return query;
};

export const usePatchMe = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: PatchMeRequest) => {
      return apiMe.patchMe(body);
    },

    onSuccess: () => {
      toast.success('Profile updated');
      navigate('/my-profile');
      queryClient.invalidateQueries({ queryKey: meProfilekeys.all });
      queryClient.invalidateQueries({ queryKey: mePostskeys.all });
      queryClient.invalidateQueries({ queryKey: feedKeys.all });
      queryClient.invalidateQueries({ queryKey: savedPostKeys.all });
    },

    onError: () => {
      toast.error('Failed to update profile');
    },
  });
};

export const useMePosts = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: mePostskeys.all,

    queryFn: ({ pageParam }) => {
      const params = {
        page: pageParam,
        limit: 20,
      };

      return apiMe.getMePosts(params);
    },

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.pagination.page + 1;
      return nextPage <= lastPage.data.pagination.totalPages
        ? nextPage
        : undefined;
    },
  });
};
