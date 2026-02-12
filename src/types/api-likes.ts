import type {
  ApiResponse,
  PaginatedPosts,
  PaginatedUsers,
  PaginationParams,
  PostSummary,
} from './api';

export type PostLikeResponse = ApiResponse<{
  liked: boolean;
  likeCount: number;
}>;

export type DeleteLikeResponse = ApiResponse<{
  liked: boolean;
  likeCount: number;
}>;

export type GetPostLikesParams = PaginationParams & { id: number };

export type GetPostLikesResponse = ApiResponse<
  PaginatedUsers<{
    id: number;
    username: string;
    name: string;
    avatarUrl: string;
    isFollowedByMe: boolean;
    isMe: boolean;
    followsMe: boolean;
  }>
>;

export type GetMeLikesParams = PaginationParams;

export type GetMeLikesResponse = ApiResponse<
  PaginatedPosts<
    PostSummary & {
      likedAt: string;
    }
  >
>;
