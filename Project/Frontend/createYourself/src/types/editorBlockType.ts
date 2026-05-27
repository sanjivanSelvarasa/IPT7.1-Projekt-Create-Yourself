import type {JsonObject} from "@/utils/jsonObject.ts";

export type EditorBlockType = {
  blockType: string,
  contentJson: JsonObject,
  sortOrder: number,
  createdAt: Date,
  id: number,
  sectionId: number,
  updatedAt: Date,
}
