import { apiFetch } from './api';
import type { User } from '../types';

export const getAllUsers = () => {
  return apiFetch<User[]>('/users');
};

export const getUserById = (id: string | number) => {
  return apiFetch<User>(`/users/${id}`);
};

export const createUser = (nickName: string) => {
  const fakeEmail = `${nickName.toLowerCase().replace(/\s+/g, '')}@Unahursocial-net.com`;
  
  return apiFetch<User>('/users', {
    method: 'POST',
    body: JSON.stringify({ 
      nickName: nickName, 
      email: fakeEmail 
    }),
  });
};