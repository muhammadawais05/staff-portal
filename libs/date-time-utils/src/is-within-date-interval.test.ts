import { isWithinDateInterval } from './is-within-date-interval'

describe('#isWithinDateInterval', () => {
  it('when provided date is before start', () => {
    expect(
      isWithinDateInterval({
        date: '2020-03-20',
        start: '2020-03-22',
        end: '2020-03-26'
      })
    ).toBe(false)
  })

  it('when provided date is after end', () => {
    expect(
      isWithinDateInterval({
        date: '2020-03-29',
        start: '2020-03-22',
        end: '2020-03-26'
      })
    ).toBe(false)
  })

  it('when provided date is in range', () => {
    expect(
      isWithinDateInterval({
        date: '2020-03-26',
        start: '2020-03-22',
        end: '2020-03-28'
      })
    ).toBe(true)
  })

  it('when provided date equals start date', () => {
    expect(
      isWithinDateInterval({
        date: '2020-03-26',
        start: '2020-03-26',
        end: '2020-03-28'
      })
    ).toBe(true)
  })

  it('when provided date equals end date', () => {
    expect(
      isWithinDateInterval({
        date: '2020-03-26',
        start: '2020-03-22',
        end: '2020-03-26'
      })
    ).toBe(true)
  })
})
