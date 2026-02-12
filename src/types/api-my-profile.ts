import type {
  ApiResponse,
  PaginatedPosts,
  PaginationParams,
  PostSummary,
  UserProfile,
  UserStats,
} from './api';

export type GetMeResponse = ApiResponse<{
  profile: UserProfile & {
    createdAt: string;
  };
  stats: UserStats;
}>;

export type PatchMeRequest = {
  name: string;
  username: string;
  phone: string;
  bio: string;
  avatar?: File;
  avatarUrl?: string;
};

export type PatchMeResponse = ApiResponse<UserProfile & { updatedAt: string }>;

export type GetMePostsParams = PaginationParams;

export type GetMePostsResponse = ApiResponse<PaginatedPosts<PostSummary>>;
