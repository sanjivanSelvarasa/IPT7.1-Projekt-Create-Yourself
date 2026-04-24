import {apiFetch} from "@/api/api.ts";

export async function registerApi(email: string, password: string){
  return apiFetch(`/users/register`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function loginApi(username: string, password: string) {
  return apiFetch(`/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  })
}

export async function logoutApi(token: string){
  return apiFetch(`/users/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: `BEARER ${token}`,
    }
  })
}

export async function tokenApi(token: string){
  return await apiFetch(`/token`, {
    method: 'POST',
    body: JSON.stringify({
      token,
    })
  })
}
