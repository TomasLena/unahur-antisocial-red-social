import { apiFetch } from './api';
import type { Post } from '../types';

export const getPosts = () => {
  return apiFetch<Post[]>('/posts');
};

export const getPostById = (id: string | number) => {
  return apiFetch<Post>(`/posts/${id}`);
};

export const getPostsByUser = (userId: string | number) => {
  return apiFetch<Post[]>(`/posts?userId=${userId}`);
};

export const createPost = (data: { description: string, userId: string | number, tagIds: (string | number)[] }) => {
  return apiFetch<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const deletePost = (id: string | number) => {
  return apiFetch(`/posts/${id}`, {
    method: 'DELETE',
  });
};