import { AxiosInstance } from '../service/axios';
import type {
  PostFollowResponse,
  DeleteFollowResponse,
  GetUserFollowersParams,
  GetUserFollowersResponse,
  GetUserFollowingParams,
  GetUserFollowingResponse,
  GetMeFollowersParams,
  GetMeFollowersResponse,
  GetMeFollowingParams,
  GetMeFollowingResponse,
} from '../types/api-follow';

export const apiFollow = {
  postFollow: async (username: string): Promise<PostFollowResponse> => {
    const response = await AxiosInstance.post<PostFollowResponse>(
      `/api/follow/${username}`
    );

    return response.data;
  },

  deleteFollow: async (username: string): Promise<DeleteFollowResponse> => {
    const response = await AxiosInstance.delete<DeleteFollowResponse>(
      `/api/follow/${username}`
    );

    return response.data;
  },

  getUserFollowers: async (
    params: GetUserFollowersParams
  ): Promise<GetUserFollowersResponse> => {
    const { username, ...pagination } = params;

    const response = await AxiosInstance.get<GetUserFollowersResponse>(
      `/api/users/${username}/followers`,
      { params: pagination }
    );

    return response.data;
  },

  getUserFollowing: async (
    params: GetUserFollowingParams
  ): Promise<GetUserFollowingResponse> => {
    const { username, ...pagination } = params;

    const response = await AxiosInstance.get<GetUserFollowingResponse>(
      `/api/users/${username}/following`,
      { params: pagination }
    );

    return response.data;
  },

  getMeFollowers: async (
    params: GetMeFollowersParams
  ): Promise<GetMeFollowersResponse> => {
    const response = await AxiosInstance.get<GetMeFollowersResponse>(
      '/api/me/followers',
      { params }
    );

    return response.data;
  },

  getMeFollowing: async (
    params: GetMeFollowingParams
  ): Promise<GetMeFollowingResponse> => {
    const response = await AxiosInstance.get<GetMeFollowingResponse>(
      '/api/me/following',
      { params }
    );

    return response.data;
  },
};
