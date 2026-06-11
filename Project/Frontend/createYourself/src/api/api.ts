const API_URL = import.meta.env.VITE_API_URL;
import { useAuthStore } from "@/stores/authStore.ts";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const authStore = useAuthStore();
  const isFormData = options?.body instanceof FormData;

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(!isFormData ? {"Content-Type": "application/json"} : {}),
      ...(options?.headers || {}),
    }
  });

  const AUTH_ENDPOINTS = ['/users/login', '/users/register', '/token'];
  const isAuthEndpoint = AUTH_ENDPOINTS.some(path => endpoint.startsWith(path));

  if(!isAuthEndpoint && (res.status === 401 || res.status === 403)) {
    try{
      await authStore.refreshToken();

      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
          ...(!isFormData ? {"Content-Type": "application/json"} : {}),
          ...(options?.headers || {}),
          ...(authStore.token ? { Authorization: `BEARER ${authStore.token}` } : {}),
        }
      })
    }catch(err){
      const text = await res.text();
      throw new Error(`ERROR: ${res.status}: ${text}`);
    }
  }

  if(!res.ok){
    const text = await res.text();

    console.log(`ERROR: ${res.status}: ${text}`);
    throw new Error(`ERROR: ${res.status}: ${text}`);
  }

  return res.json();
}
