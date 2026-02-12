import type { PostLoginRequest, PostRegisterRequest } from '@/types/api-auth';
import { apiAuth } from '@/api/api-auth';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/query-client';

const handleToken = (token: string) => {
  Cookies.set('token', token, {
    expires: 7,
    path: '/',
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PostRegisterRequest) => {
      return apiAuth.postRegister(data);
    },
    onSuccess: (response) => {
      handleToken(response.data.token);
      queryClient.clear();
      navigate('/');
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PostLoginRequest) => {
      return apiAuth.postLogin(data);
    },
    onSuccess: (response) => {
      handleToken(response.data.token);
      queryClient.clear();
      navigate('/');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    Cookies.remove('token', { path: '/' });
    queryClient.clear();
    navigate('/login');
  };
};
