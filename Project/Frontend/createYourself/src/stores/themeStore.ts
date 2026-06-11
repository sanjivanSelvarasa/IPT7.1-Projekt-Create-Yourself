import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getThemesApi,
  getThemeByIdApi,
  setPortfolioThemeApi,
  createThemeApi,
  updateThemeApi,
  deleteThemeApi,
} from "@/api/theme.api.ts";
import type { ThemeType } from "@/types/themeType.ts";

export const useThemeStore = defineStore("theme", () => {
  const themes = ref<ThemeType[]>([]);
  const selectedTheme = ref<ThemeType | null>(null);

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function getThemes(): Promise<ThemeType[] | undefined> {
    loading.value = true;
    error.value = null;

    try {
      themes.value = await getThemesApi();
      return themes.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Themes konnten nicht geladen werden";
    } finally {
      loading.value = false;
    }
  }

  async function getThemeById(themeId: number): Promise<ThemeType | undefined> {
    loading.value = true;
    error.value = null;

    try {
      selectedTheme.value = await getThemeByIdApi(themeId);
      return selectedTheme.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Theme konnte nicht geladen werden";
    } finally {
      loading.value = false;
    }
  }

  async function setPortfolioTheme(portfolioId: number, themeId: number): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      await setPortfolioThemeApi(portfolioId, themeId);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Theme konnte nicht gesetzt werden";
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function createTheme(
    theme: Omit<ThemeType, "id" | "createdAt">
  ): Promise<ThemeType | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const newTheme = await createThemeApi(theme);
      themes.value.push(newTheme);
      return newTheme;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Theme konnte nicht erstellt werden";
    } finally {
      loading.value = false;
    }
  }

  async function updateTheme(themeId: number, theme: Partial<Omit<ThemeType, "id" | "createdAt">>): Promise<ThemeType | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const updatedTheme = await updateThemeApi(themeId, theme);

      themes.value = themes.value.map((t) =>
        t.id === themeId ? updatedTheme : t
      );

      if (selectedTheme.value?.id === themeId) {
        selectedTheme.value = updatedTheme;
      }

      return updatedTheme;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Theme konnte nicht aktualisiert werden";
    } finally {
      loading.value = false;
    }
  }

  async function deleteTheme(themeId: number): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      await deleteThemeApi(themeId);

      themes.value = themes.value.filter((theme) => theme.id !== themeId);

      if (selectedTheme.value?.id === themeId) {
        selectedTheme.value = null;
      }

      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Theme konnte nicht gelöscht werden";
      return false;
    } finally {
      loading.value = false;
    }
  }

  function clearSelectedTheme() {
    selectedTheme.value = null;
  }

  function clearError() {
    error.value = null;
  }

  return { themes, selectedTheme, loading, error, getThemes, getThemeById, setPortfolioTheme, createTheme, updateTheme, deleteTheme, clearSelectedTheme, clearError,};
});
