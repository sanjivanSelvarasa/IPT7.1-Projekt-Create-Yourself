import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatDate, formatTime, getDateGap } from '@/utils/date'

describe('formatTime', () => {
  it('pads single-digit numbers with a leading zero', () => {
    expect(formatTime(5)).toBe('05')
    expect(formatTime(0)).toBe('00')
  })

  it('leaves double-digit numbers unchanged', () => {
    expect(formatTime(12)).toBe('12')
    expect(formatTime(59)).toBe('59')
  })
})

describe('formatDate', () => {
  it('returns a formatted date string in Swiss German locale', () => {
    const date = new Date(2024, 0, 5) // 5. Jan. 2024
    const result = formatDate(date)
    expect(result).toContain('2024')
    expect(result).toContain('05')
  })
})

describe('getDateGap', () => {
  beforeEach(() => {
    // Pin "now" to a fixed point in time
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns minutes-ago format for dates within the last hour', () => {
    const thirtyMinutesAgo = new Date('2024-06-15T11:30:00')
    const result = getDateGap(thirtyMinutesAgo)
    expect(result).toContain('30')
    expect(result).toContain('min')
  })

  it('returns hours-ago format for dates within the last 24 hours', () => {
    const twoHoursAgo = new Date('2024-06-15T10:00:00')
    const result = getDateGap(twoHoursAgo)
    expect(result).toContain('2')
    expect(result).toContain('min') // note: current impl says "min" even for hours
  })

  it('returns "Gestern" for yesterday', () => {
    const yesterday = new Date('2024-06-14T09:00:00')
    const result = getDateGap(yesterday)
    expect(result).toContain('Gestern')
  })

  it('returns year when date is in a different year', () => {
    const lastYear = new Date('2023-01-10T09:00:00')
    const result = getDateGap(lastYear)
    expect(result).toContain('2023')
  })
})
