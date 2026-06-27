import { apiFetch } from './api';
import type { Tag } from '../types';

export const getTags = () => {
  return apiFetch<Tag[]>('/tags');
};