import type {JsonObject} from "@/utils/jsonObject.ts";
import type {TextBlockContent} from "@/types/textBlockContent.ts";

export type CreateTextEditorBlockType = {
  blockType: 'text',
  contentJson: TextBlockContent,
  sortOrder: number,
}
