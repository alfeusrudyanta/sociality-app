import type {
  ApiResponse,
  PaginatedUsers,
  PaginationParams,
  UserSearch,
} from './api';

export type PostFollowResponse = ApiResponse<{ following: boolean }>;

export type DeleteFollowResponse = ApiResponse<{ following: boolean }>;

export type GetUserFollowersParams = PaginationParams & { username: string };

export type GetUserFollowersResponse = ApiResponse<PaginatedUsers<UserSearch>>;

export type GetUserFollowingParams = PaginationParams & { username: string };

export type GetUserFollowingResponse = ApiResponse<PaginatedUsers<UserSearch>>;

export type GetMeFollowersParams = PaginationParams;

export type GetMeFollowersResponse = ApiResponse<PaginatedUsers<UserSearch>>;

export type GetMeFollowingParams = PaginationParams;

export type GetMeFollowingResponse = ApiResponse<PaginatedUsers<UserSearch>>;
