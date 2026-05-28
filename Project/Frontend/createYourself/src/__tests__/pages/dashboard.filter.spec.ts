import { describe, it, expect } from 'vitest'

/**
 * Tests the portfolio filtering logic from Dashboard.vue
 * (documented feature: "Übersicht über alle Portfolios", search & visibility filter)
 *
 * The logic is extracted here as a pure function matching the component's
 * computed property exactly, so it can be tested without mounting the full page.
 */

interface Portfolio {
  id: number
  title: string
  description: string
  visibility: string
}

function filterPortfolios(portfolios: Portfolio[], search: string, status: string): Portfolio[] {
  const filtered = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  )
  if (status === 'all') return filtered
  if (status === 'private') return filtered.filter((p) => p.visibility.toLowerCase() === 'private')
  return filtered.filter((p) => p.visibility.toLowerCase() === 'public')
}

const portfolios: Portfolio[] = [
  { id: 1, title: 'My Dev Portfolio', description: 'A portfolio for developers', visibility: 'public' },
  { id: 2, title: 'Design Work', description: 'Graphic design projects', visibility: 'private' },
  { id: 3, title: 'Secret Project', description: 'Not yet ready', visibility: 'private' },
]

describe('Dashboard – portfolio search & filter (Übersicht über alle Portfolios)', () => {
  describe('search by title', () => {
    it('returns portfolios whose title matches the search term', () => {
      const result = filterPortfolios(portfolios, 'dev', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(1)
    })

    it('is case-insensitive', () => {
      const result = filterPortfolios(portfolios, 'DESIGN', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(2)
    })
  })

  describe('search by description', () => {
    it('returns portfolios whose description matches the search term', () => {
      const result = filterPortfolios(portfolios, 'graphic', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(2)
    })
  })

  describe('status filter (Portfolio-Aktionen – Veröffentlichen)', () => {
    it('returns all portfolios when status is "all"', () => {
      const result = filterPortfolios(portfolios, '', 'all')
      expect(result).toHaveLength(3)
    })

    it('returns only private portfolios when status is "private"', () => {
      const result = filterPortfolios(portfolios, '', 'private')
      expect(result.every((p) => p.visibility === 'private')).toBe(true)
      expect(result).toHaveLength(2)
    })

    it('returns only public portfolios when status is "public"', () => {
      const result = filterPortfolios(portfolios, '', 'public')
      expect(result.every((p) => p.visibility === 'public')).toBe(true)
      expect(result).toHaveLength(1)
    })
  })

  describe('combined search + status filter', () => {
    it('applies both filters together', () => {
      // "project" matches title of id=3 (private) and description of id=2 (private)
      const result = filterPortfolios(portfolios, 'project', 'public')
      // "My Dev Portfolio" description contains "developers" not "project",
      // "Design Work" description "Graphic design projects" contains "project" → but it's private
      // "Secret Project" title contains "project" → but it's private
      expect(result).toHaveLength(0)
    })

    it('returns matching public results when they exist', () => {
      const result = filterPortfolios(portfolios, 'portfolio', 'public')
      // "My Dev Portfolio" title contains "portfolio" and visibility is public
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(1)
    })
  })

  describe('no-results state', () => {
    it('returns an empty array when no portfolios match the search', () => {
      const result = filterPortfolios(portfolios, 'xyznotexists', 'all')
      expect(result).toHaveLength(0)
    })

    it('returns empty when search is non-empty and nothing matches', () => {
      const result = filterPortfolios(portfolios, 'zzz', 'all')
      const noResults = result.length === 0
      expect(noResults).toBe(true)
    })
  })
})
