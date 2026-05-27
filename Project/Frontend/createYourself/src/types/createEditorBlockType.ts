import type {JsonObject} from "@/utils/jsonObject.ts";

export type CreateEditorBlockType = {
  blockType: 'image' | 'project' | 'skill',
  contentJson: JsonObject,
  sortOrder: number,
}
