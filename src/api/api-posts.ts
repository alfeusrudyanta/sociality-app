import { AxiosInstance } from '@/service/axios';
import type {
  GetPostsParams,
  GetPostsResponse,
  PostPostRequest,
  PostPostResponse,
  GetPostResponse,
  DeletePostResponse,
} from '@/types/api-posts';

export const apiPosts = {
  getPosts: async (params: GetPostsParams): Promise<GetPostsResponse> => {
    const response = await AxiosInstance.get<GetPostsResponse>('/api/posts', {
      params,
    });

    return response.data;
  },

  postPost: async (body: PostPostRequest): Promise<PostPostResponse> => {
    const formData = new FormData();

    formData.append('image', body.image);
    formData.append('caption', body.caption);

    const response = await AxiosInstance.post<PostPostResponse>(
      '/api/posts',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  getPost: async (id: number): Promise<GetPostResponse> => {
    const response = await AxiosInstance.get<GetPostResponse>(
      `/api/posts/${id}`
    );

    return response.data;
  },

  deletePost: async (id: number): Promise<DeletePostResponse> => {
    const response = await AxiosInstance.delete<DeletePostResponse>(
      `/api/posts/${id}`
    );

    return response.data;
  },
};
