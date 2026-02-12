import type {
  ApiResponse,
  PaginatedPosts,
  PaginatedUsers,
  PaginationParams,
  PostSummary,
  UserProfile,
  UserSearch,
  UserStats,
} from './api';

// List post that this user likes
export type GetUserLikesParams = PaginationParams & {
  username: string;
};

export type GetUserLikesResponse = ApiResponse<PaginatedPosts<PostSummary>>;

// List post by username
export type GetUserPostsParams = PaginationParams & {
  username: string;
};

export type GetUserPostsResponse = ApiResponse<PaginatedPosts<PostSummary>>;

// Search user by name/username
export type GetUserSearchParams = PaginationParams & {
  q: string;
};

export type GetUserSearchResponse = ApiResponse<PaginatedUsers<UserSearch>>;

// Search one user by username
export type GetUserProfileResponse = ApiResponse<
  UserProfile & {
    counts: UserStats;
    isFollowing: boolean;
    isMe: boolean;
  }
>;
