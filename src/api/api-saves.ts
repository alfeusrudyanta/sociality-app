import { AxiosInstance } from '@/service/axios';
import type {
  PostSaveResponse,
  DeleteSaveResponse,
  GetMeSavedPostsParams,
  GetMeSavedPostsResponse,
} from '@/types/api-saves';

export const apiSaves = {
  postSave: async (id: number): Promise<PostSaveResponse> => {
    const response = await AxiosInstance.post<PostSaveResponse>(
      `/api/posts/${id}/save`
    );

    return response.data;
  },

  deleteSave: async (id: number): Promise<DeleteSaveResponse> => {
    const response = await AxiosInstance.delete<DeleteSaveResponse>(
      `/api/posts/${id}/save`
    );

    return response.data;
  },

  getMeSavedPosts: async (
    params: GetMeSavedPostsParams
  ): Promise<GetMeSavedPostsResponse> => {
    const response = await AxiosInstance.get<GetMeSavedPostsResponse>(
      '/api/me/saved',
      { params }
    );

    return response.data;
  },
};
