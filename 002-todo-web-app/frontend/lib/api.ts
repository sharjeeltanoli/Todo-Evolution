import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchClient(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path}`;
  
  const session = await authClient.getSession();
  const token = session?.data?.session?.token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Attempt to parse error message
    let errorMessage = response.statusText;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
      // ignore json parse error
    }
    throw new Error(`API Error (${response.status}): ${errorMessage}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
