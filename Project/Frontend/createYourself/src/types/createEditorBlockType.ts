import type {JsonObject} from "@/utils/jsonObject.ts";

export type CreateEditorBlockType = {
  blockType: 'image' | 'project' | 'skill' | 'education' | 'experience' | 'link',
  contentJson: JsonObject,
  sortOrder: number,
}
