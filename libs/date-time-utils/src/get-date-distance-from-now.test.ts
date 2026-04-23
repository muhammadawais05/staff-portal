import { add, sub } from 'date-fns'

import getDateDistanceFromNow from './get-date-distance-from-now'

describe('getDateDistanceFromNow', () => {
  it('formats single day in the future', () => {
    const date = add(new Date(), { days: 1 }).toISOString()
    const result = getDateDistanceFromNow(date)

    expect(result).toBe('1 day from now')
  })

  it('formats multiple days in the future', () => {
    const date = add(new Date(), { days: 3 }).toISOString()
    const result = getDateDistanceFromNow(date)

    expect(result).toBe('3 days from now')
  })

  it('should round the number of days', () => {
    const roundDown = add(new Date(), { days: 3, hours: 11 }).toISOString()

    expect(getDateDistanceFromNow(roundDown)).toBe('3 days from now')

    const roundUp = add(new Date(), { days: 3, hours: 12 }).toISOString()

    expect(getDateDistanceFromNow(roundUp)).toBe('4 days from now')
  })

  it('formats single day in the past', () => {
    const date = sub(new Date(), { days: 1 }).toISOString()
    const result = getDateDistanceFromNow(date)

    expect(result).toBe('1 day ago')
  })

  it('formats multiple days in the past', () => {
    const date = sub(new Date(), { days: 3 }).toISOString()
    const result = getDateDistanceFromNow(date)

    expect(result).toBe('3 days ago')
  })

  it('should hide suffix if options tell so', () => {
    const date = sub(new Date(), { days: 3 }).toISOString()
    const result = getDateDistanceFromNow(date, { hideSuffix: true })

    expect(result).toBe('3 days')
  })
})
