import type {
  ApiResponse,
  PaginatedItems,
  PaginationParams,
  PostSummary,
} from './api';

export type GetFeedParams = PaginationParams;

export type GetFeedResponse = ApiResponse<PaginatedItems<PostSummary>>;
