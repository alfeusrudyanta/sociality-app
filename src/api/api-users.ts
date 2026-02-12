import { AxiosInstance } from '@/service/axios';
import type {
  GetUserLikesParams,
  GetUserLikesResponse,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetUserSearchParams,
  GetUserSearchResponse,
  GetUserProfileResponse,
} from '@/types/api-users';

export const apiUsers = {
  getUserLikes: async (
    params: GetUserLikesParams
  ): Promise<GetUserLikesResponse> => {
    const { username, ...pagination } = params;

    const response = await AxiosInstance.get<GetUserLikesResponse>(
      `/api/users/${username}/likes`,
      { params: pagination }
    );

    return response.data;
  },

  getUserPosts: async (
    params: GetUserPostsParams
  ): Promise<GetUserPostsResponse> => {
    const { username, ...pagination } = params;

    const response = await AxiosInstance.get<GetUserPostsResponse>(
      `/api/users/${username}/posts`,
      { params: pagination }
    );

    return response.data;
  },

  getUserSearch: async (
    params: GetUserSearchParams
  ): Promise<GetUserSearchResponse> => {
    const response = await AxiosInstance.get<GetUserSearchResponse>(
      '/api/users/search',
      { params }
    );

    return response.data;
  },

  getUserProfile: async (username: string): Promise<GetUserProfileResponse> => {
    const response = await AxiosInstance.get<GetUserProfileResponse>(
      `/api/users/${username}`
    );

    return response.data;
  },
};
