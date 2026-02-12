import type { ApiResponse, User } from './api';

export type PostRegisterRequest = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type PostRegisterResponse = ApiResponse<{
  token: string;
  user: User;
}>;

export type PostLoginRequest = {
  email: string;
  password: string;
};

export type PostLoginResponse = ApiResponse<{
  token: string;
  user: User;
}>;
