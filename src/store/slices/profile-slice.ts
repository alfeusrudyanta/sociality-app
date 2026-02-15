import type { UserProfile, UserStats } from '../../types/api';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { RootState } from '../store';

type ProfileSlice = {
  profile: UserProfile & {
    createdAt: string;
  };
  stats: UserStats;
};

const initialState: ProfileSlice = {
  profile: {
    id: 0,
    name: 'User',
    username: 'User',
    email: 'user@email.com',
    phone: '0818123456789',
    avatarUrl: null,
    bio: 'Hello World',
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  stats: {
    likes: 0,
    posts: 0,
    followers: 0,
    following: 0,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<ProfileSlice>) => {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;
