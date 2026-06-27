// src/services/api.ts

const API_URL = 'http://localhost:3001';

/**
 * Función genérica para hacer peticiones fetch tipadas.
 * @param endpoint La ruta a consultar (ej: '/users')
 * @param options Opciones nativas de fetch (method, body, headers, etc.)
 */
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || errorData?.error || `Error HTTP: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}