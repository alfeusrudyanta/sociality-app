import type { ApiResponse, PaginatedPosts, PaginationParams } from './api';

export type PostSaveResponse = ApiResponse<{ saved: boolean }>;

export type DeleteSaveResponse = ApiResponse<{ saved: boolean }>;

export type GetMeSavedPostsParams = PaginationParams;

export type GetMeSavedPostsResponse = ApiResponse<
  PaginatedPosts<{
    id: number;
    imageUrl: string;
    caption: string;
    createdAt: string;
  }>
>;
