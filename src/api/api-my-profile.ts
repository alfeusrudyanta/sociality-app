import { AxiosInstance } from '../service/axios';
import type {
  GetMeResponse,
  PatchMeRequest,
  PatchMeResponse,
  GetMePostsParams,
  GetMePostsResponse,
} from '../types/api-my-profile';

export const apiMe = {
  getMe: async (): Promise<GetMeResponse> => {
    const response = await AxiosInstance.get<GetMeResponse>('/api/me');
    return response.data;
  },

  patchMe: async (body: PatchMeRequest): Promise<PatchMeResponse> => {
    const formData = new FormData();

    formData.append('name', body.name);
    formData.append('username', body.username);
    formData.append('phone', body.phone);
    formData.append('bio', body.bio);
    formData.append('avatar', body.avatar);

    const response = await AxiosInstance.patch<PatchMeResponse>(
      '/api/me',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  getMePosts: async (params: GetMePostsParams): Promise<GetMePostsResponse> => {
    const response = await AxiosInstance.get<GetMePostsResponse>(
      '/api/me/posts',
      {
        params,
      }
    );

    return response.data;
  },
};
