import type {
  ApiResponse,
  PaginatedItems,
  PaginationParams,
  PostSummary,
} from './api';

export type GetPostsParams = PaginationParams;

export type GetPostsResponse = ApiResponse<PaginatedItems<PostSummary>>;

export type PostPostRequest = {
  image: File;
  caption: string;
};

export type PostPostResponse = ApiResponse<PostSummary>;

export type GetPostResponse = ApiResponse<PostSummary>;

export type DeletePostResponse = ApiResponse<{ deleted: boolean }>;
