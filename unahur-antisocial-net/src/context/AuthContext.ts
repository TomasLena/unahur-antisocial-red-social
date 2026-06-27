import { createContext } from 'react';
import type { User } from '../types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (nickName: string, password?: string) => Promise<boolean>;
  register: (nickName: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);