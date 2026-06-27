import { apiFetch } from './api';
import type { PostImage } from '../types';

export const getImagesByPostId = (postId: string | number) => {
  return apiFetch<PostImage[]>(`/postimages/post/${postId}`);
};

export const createPostImage = (data: { url: string, postId: string | number }) => {
  return apiFetch<PostImage>('/postimages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};