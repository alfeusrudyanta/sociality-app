export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
};

export type UserProfile = User & {
  bio: string | null;
};

export type UserStats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
};

export type UserSearch = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedItems<T> = {
  items: T[];
  pagination: Pagination;
};

export type PaginatedPosts<T> = {
  posts: T[];
  pagination: Pagination;
};

export type PaginatedUsers<T> = {
  users: T[];
  pagination: Pagination;
};

export type PaginatedComments<T> = {
  comments: T[];
  pagination: Pagination;
};

export type Author = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
};

export type PostSummary = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

export type Comment = {
  id: number;
  text: string;
  createdAt: string;
  author: Author;
};
