const envApiUrl = import.meta.env.VITE_API_URL?.trim();

function resolveApiUrl(): string {
  if (typeof window === "undefined") {
    return envApiUrl ?? "";
  }

  const currentOrigin = window.location.origin;
  const currentHost = window.location.hostname;
  const isCurrentHostLocal = ["localhost", "127.0.0.1", "::1"].includes(currentHost);

  if (!envApiUrl) {
    return currentOrigin;
  }

  try {
    const parsedUrl = new URL(envApiUrl, currentOrigin);
    const targetsLocalhost = ["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname);

    if (!isCurrentHostLocal && targetsLocalhost) {
      return currentOrigin;
    }

    return parsedUrl.origin;
  } catch {
    return envApiUrl.replace(/\/$/, "");
  }
}

const API_URL = resolveApiUrl();
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
