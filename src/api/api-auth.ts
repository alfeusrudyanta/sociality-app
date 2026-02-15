import { AxiosInstance } from '../service/axios';
import type {
  PostLoginRequest,
  PostLoginResponse,
  PostRegisterRequest,
  PostRegisterResponse,
} from '../types/api-auth';

export const apiAuth = {
  postRegister: async (
    data: PostRegisterRequest
  ): Promise<PostRegisterResponse> => {
    const response = await AxiosInstance.post<PostRegisterResponse>(
      '/api/auth/register',
      data
    );

    return response.data;
  },

  postLogin: async (data: PostLoginRequest): Promise<PostLoginResponse> => {
    const response = await AxiosInstance.post<PostLoginResponse>(
      '/api/auth/login',
      data
    );

    return response.data;
  },
};
