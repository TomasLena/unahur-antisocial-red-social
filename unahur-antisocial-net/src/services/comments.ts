import { apiFetch } from './api';
import type { Comment } from '../types';

export const getCommentsByPostId = (postId: string | number) => {
  return apiFetch<Comment[]>(`/comments/post/${postId}`);
};

export const createComment = (data: { postId: string | number, userId: string | number, content: string }) => {

  return apiFetch<Comment>('/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};