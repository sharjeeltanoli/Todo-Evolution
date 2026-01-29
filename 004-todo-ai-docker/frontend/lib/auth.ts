// frontend/lib/auth.ts

import { NEXT_PUBLIC_BACKEND_URL } from './constants';
import { UserLogin, UserRegister, AuthResponse, User } from '@/types';

// Helper function to decode JWT token
function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Function to get current user ID from stored JWT
export function getCurrentUserId(): number | null {
  const user = getCurrentUser();
  return user ? user.id : null;
}

// Function to get full current user object from stored JWT
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null; // Don't run on server side
  }
  const token = localStorage.getItem('access_token');
  if (token) {
    const decodedToken = decodeJwt(token);
    if (decodedToken && decodedToken.sub) {
      return {
        id: parseInt(decodedToken.sub, 10),
        email: decodedToken.email,
        name: decodedToken.name,
        gender: decodedToken.gender
      };
    }
  }
  return null;
}

export async function login(credentials: UserLogin): Promise<AuthResponse> {
  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: response.statusText || 'Login failed' };
    }
    throw new Error(errorData.detail || 'Login failed');
  }

  return response.json();
}

export async function signup(userData: UserRegister): Promise<AuthResponse> {
  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: response.statusText || 'Signup failed' };
    }
    throw new Error(errorData.detail || 'Signup failed');
  }

  return response.json();
}

export async function logout(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
  }
  console.log('User logged out');
}
