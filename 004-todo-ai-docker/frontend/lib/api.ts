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

  let url = NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  // Remove quotes if present (common Windows env issue)
  url = url.replace(/^['"]|['"]$/g, '');
  const baseUrl = url.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  
  const response = await fetch(`${baseUrl}/${cleanEndpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: response.statusText };
    }
    console.error('API Error:', response.status, response.url, errorData);
    throw new Error(errorData.detail || 'API request failed');
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

