// frontend/lib/api.ts

import { NEXT_PUBLIC_BACKEND_URL } from './constants';

interface RequestOptions extends RequestInit {
  authToken?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const token = options?.authToken || localStorage.getItem('access_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'API request failed');
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

