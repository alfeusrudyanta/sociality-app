import { AxiosInstance } from '../service/axios';
import type {
  PostLikeResponse,
  DeleteLikeResponse,
  GetPostLikesParams,
  GetPostLikesResponse,
  GetMeLikesParams,
  GetMeLikesResponse,
} from '../types/api-likes';

export const apiLikes = {
  postLike: async (id: number): Promise<PostLikeResponse> => {
    const response = await AxiosInstance.post<PostLikeResponse>(
      `/api/posts/${id}/like`
    );

    return response.data;
  },

  deleteLike: async (id: number): Promise<DeleteLikeResponse> => {
    const response = await AxiosInstance.delete<DeleteLikeResponse>(
      `/api/posts/${id}/like`
    );

    return response.data;
  },

  getPostLikes: async (
    params: GetPostLikesParams
  ): Promise<GetPostLikesResponse> => {
    const { id, ...pagination } = params;

    const response = await AxiosInstance.get<GetPostLikesResponse>(
      `/api/posts/${id}/likes`,
      {
        params: pagination,
      }
    );

    return response.data;
  },

  getMeLikes: async (params: GetMeLikesParams): Promise<GetMeLikesResponse> => {
    const response = await AxiosInstance.get<GetMeLikesResponse>(
      `/api/me/likes`,
      {
        params,
      }
    );

    return response.data;
  },
};
