import { AxiosInstance } from '../service/axios';
import type {
  GetCommentsParams,
  GetCommentsResponse,
  PostCommentRequest,
  PostCommentResponse,
  DeleteCommentResponse,
} from '../types/api-comments';

export const apiComments = {
  getComments: async (
    params: GetCommentsParams
  ): Promise<GetCommentsResponse> => {
    const { id, ...pagination } = params;

    const response = await AxiosInstance.get<GetCommentsResponse>(
      `/api/posts/${id}/comments`,
      { params: pagination }
    );

    return response.data;
  },

  postComment: async (
    id: number,
    data: PostCommentRequest
  ): Promise<PostCommentResponse> => {
    const response = await AxiosInstance.post<PostCommentResponse>(
      `/api/posts/${id}/comments`,
      data
    );

    return response.data;
  },

  deleteComment: async (id: number): Promise<DeleteCommentResponse> => {
    const response = await AxiosInstance.delete<DeleteCommentResponse>(
      `/api/comments/${id}`
    );

    return response.data;
  },
};
