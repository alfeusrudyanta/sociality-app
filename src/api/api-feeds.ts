import { AxiosInstance } from '../service/axios';
import type { GetFeedParams, GetFeedResponse } from '../types/api-feeds';

export const apiFeed = {
  getFeed: async (params: GetFeedParams): Promise<GetFeedResponse> => {
    const response = await AxiosInstance.get<GetFeedResponse>('/api/feed', {
      params,
    });

    return response.data;
  },
};
