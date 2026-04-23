import { monthYearFormatter } from './month-year-formatter'

describe('monthYearFormatter', () => {
  it('is original formatting', () => {
    expect(monthYearFormatter(2012, 3)).toBe('April 2012')
  })
})
