export type TextBlockContent = {
  text: string,
  tag?: 'p' | 'h1' | 'h2' | 'h3',
  align?: 'left' | 'center' | 'right',
  fontSize?: number,
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold',
  color?: string,
}
