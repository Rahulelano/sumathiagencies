import axios from 'axios';
import type { GalleryItem } from '../types';

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
export const API_BASE_URL = `${BACKEND_URL}/api`;

const TOKEN_KEY = 'sumathi_admin_token';
const USER_KEY = 'sumathi_admin_user';

// Create configured Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60s timeout for large video uploads
});

// Request interceptor to attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on unauthorized if in admin section
      if (window.location.pathname.includes('/admin')) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    return Promise.reject(error);
  }
);

// Helper to resolve full URL for media uploaded to backend
export function getMediaUrl(url?: string): string {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    return `${BACKEND_URL}${url}`;
  }
  if (url.startsWith('/')) {
    return url;
  }
  return `${BACKEND_URL}/${url}`;
}

// Auth API
export async function login(username: string, password: string) {
  const response = await api.post('/auth/login', { username, password });
  if (response.data.success && response.data.token) {
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
  }
  return response.data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

// Gallery API
export interface GalleryFilterParams {
  category?: string;
  mediaType?: 'image' | 'video' | 'all';
  search?: string;
}

export async function fetchGalleryItems(
  params?: GalleryFilterParams
): Promise<GalleryItem[]> {
  const queryParams: Record<string, string> = {};
  if (params?.category && params.category !== 'all') {
    queryParams.category = params.category;
  }
  if (params?.mediaType && params.mediaType !== 'all') {
    queryParams.mediaType = params.mediaType;
  }
  if (params?.search && params.search.trim()) {
    queryParams.search = params.search.trim();
  }

  const response = await api.get('/gallery', { params: queryParams });
  if (response.data && response.data.data) {
    return response.data.data.map((item: any) => ({
      ...item,
      id: item._id || item.id,
      image: getMediaUrl(item.mediaUrl || item.image),
      mediaUrl: getMediaUrl(item.mediaUrl || item.image),
    }));
  }
  return [];
}

export async function fetchGalleryItemById(id: string): Promise<GalleryItem | null> {
  const response = await api.get(`/gallery/${id}`);
  if (response.data && response.data.data) {
    const item = response.data.data;
    return {
      ...item,
      id: item._id || item.id,
      image: getMediaUrl(item.mediaUrl || item.image),
      mediaUrl: getMediaUrl(item.mediaUrl || item.image),
    };
  }
  return null;
}

export async function createGalleryItem(
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
) {
  const response = await api.post('/gallery', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
}

export async function updateGalleryItem(
  id: string,
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
) {
  const response = await api.put(`/gallery/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
}

export async function deleteGalleryItem(id: string) {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
}
