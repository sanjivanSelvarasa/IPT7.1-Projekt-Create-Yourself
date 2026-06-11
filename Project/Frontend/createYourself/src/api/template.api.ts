import { apiFetch } from "@/api/api.ts";
import type { TemplateType } from "@/types/templateType.ts";
import type {ThemeType} from "@/types/themeType.ts";

export async function getTemplatesApi(): Promise<TemplateType[]> {
  return apiFetch("/templates", {
    method: "GET",
  });
}

export async function getTemplateByIdApi(templateId: number): Promise<TemplateType> {
  return apiFetch(`/templates/${templateId}`, {
    method: "GET",
  });
}

export async function setPortfolioTemplateApi(portfolioId: number, templateId: number): Promise<void> {
  return apiFetch(`/portfolio/${portfolioId}/template`, {
    method: "PUT",
    body: JSON.stringify({
      templateId,
    }),
  });
}
