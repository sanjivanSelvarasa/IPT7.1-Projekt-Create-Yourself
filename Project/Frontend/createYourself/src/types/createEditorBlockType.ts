export type CreateEditorBlockType = {
  blockType: string,
  contentJson: JsonObject,
  sortOrder: number,
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue
}
