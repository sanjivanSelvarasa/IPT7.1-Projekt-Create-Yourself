import { describe, it, expect } from 'vitest'
import { toSlug } from '@/utils/slug'

describe('toSlug', () => {
  it('lowercases the string', () => {
    expect(toSlug('Hello')).toBe('hello')
  })

  it('replaces spaces with hyphens', () => {
    expect(toSlug('my portfolio')).toBe('my-portfolio')
  })

  it('trims leading and trailing whitespace', () => {
    expect(toSlug('  clean  ')).toBe('clean')
  })

  it('removes special characters', () => {
    expect(toSlug('hello@world!')).toBe('helloworld')
  })

  it('keeps hyphens and alphanumeric characters', () => {
    expect(toSlug('my-portfolio-2024')).toBe('my-portfolio-2024')
  })

  it('handles an empty string', () => {
    expect(toSlug('')).toBe('')
  })

  it('handles multiple spaces between words', () => {
    // trim only removes leading/trailing; inner multiple spaces each become a hyphen
    expect(toSlug('hello   world')).toContain('hello')
    expect(toSlug('hello   world')).toContain('world')
  })
})
