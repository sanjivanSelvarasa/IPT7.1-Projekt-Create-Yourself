import { apiFetch } from "@/api/api.ts";
import type { ThemeType } from "@/types/themeType.ts";

export async function getThemesApi(): Promise<ThemeType[]> {
  return apiFetch("/themes", {
    method: "GET",
  });
}

export async function getThemeByIdApi(themeId: number): Promise<ThemeType> {
  return apiFetch(`/themes/${themeId}`, {
    method: "GET",
  });
}

export async function setPortfolioThemeApi(
  portfolioId: number,
  themeId: number
): Promise<void> {
  return apiFetch(`/portfolio/${portfolioId}/theme`, {
    method: "PUT",
    body: JSON.stringify({
      themeId,
    }),
  });
}

export async function createThemeApi(theme: Omit<ThemeType, "id" | "createdAt">): Promise<ThemeType> {
  return apiFetch("/themes", {
    method: "POST",
    body: JSON.stringify(theme),
  });
}

export async function updateThemeApi(
  themeId: number,
  theme: Partial<Omit<ThemeType, "id" | "createdAt">>
): Promise<ThemeType> {
  return apiFetch(`/themes/${themeId}`, {
    method: "PUT",
    body: JSON.stringify(theme),
  });
}

export async function deleteThemeApi(themeId: number): Promise<void> {
  return apiFetch(`/themes/${themeId}`, {
    method: "DELETE",
  });
}
