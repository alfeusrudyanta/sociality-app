import type {
  ApiResponse,
  PaginatedComments,
  PaginationParams,
  Comment,
} from './api';

export type GetCommentsParams = PaginationParams & {
  id: number;
};

export type GetCommentsResponse = ApiResponse<PaginatedComments<Comment>>;

export type PostCommentRequest = {
  text: string;
};

export type PostCommentResponse = ApiResponse<
  Comment & {
    isMine: boolean;
  }
>;

export type DeleteCommentResponse = ApiResponse<{ deleted: boolean }>;
