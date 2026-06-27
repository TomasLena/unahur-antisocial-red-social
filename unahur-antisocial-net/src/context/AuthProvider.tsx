import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { getAllUsers, createUser } from '../services/users';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
    
    const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('uhn_session');
    return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (nickName: string, password?: string): Promise<boolean> => {
    setLoading(true);
        setError(null);
        try {
        if (password !== '123456') {
            throw new Error('ACCESS DENIED: Invalid password instance.');
        }

        const users = await getAllUsers();
        const foundUser = users.find(
            (u) => u.nickName.toLowerCase() === nickName.toLowerCase()
        );

        if (!foundUser) {
            throw new Error('STATUS 404: User node not found in repository.');
        }

        setUser(foundUser);
        localStorage.setItem('uhn_session', JSON.stringify(foundUser));
        return true;
        
        } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Fatal authentication error.');
        return false;
        } finally {
        setLoading(false);
        }
    };

    const register = async (nickName: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
        const users = await getAllUsers();
        const exists = users.some(
            (u) => u.nickName.toLowerCase() === nickName.toLowerCase()
        );

        if (exists) {
            throw new Error('CONFLICT: Username already allocated.');
        }

        const newUser = await createUser(nickName);
        
        setUser(newUser);
        localStorage.setItem('uhn_session', JSON.stringify(newUser));
        return true;
        
        } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Registration failure.');
        return false;
        } finally {
        setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('uhn_session');
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
        {children}
        </AuthContext.Provider>
    );
}