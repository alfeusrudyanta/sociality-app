import type {
  ApiResponse,
  PaginatedItems,
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

type AvatarFileOnly = {
  avatar: File;
  avatarUrl?: never;
};

type AvatarUrlOnly = {
  avatar?: never;
  avatarUrl: string;
};

export type PatchMeRequest = {
  name: string;
  username: string;
  phone: string;
  bio: string;
} & (AvatarFileOnly | AvatarUrlOnly);

export type PatchMeResponse = ApiResponse<UserProfile & { updatedAt: string }>;

export type GetMePostsParams = PaginationParams;

export type GetMePostsResponse = ApiResponse<PaginatedItems<PostSummary>>;
