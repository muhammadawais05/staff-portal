import { calculateDisplayDate } from './calculate-display-date'

describe('calculateDisplayDate', () => {
  it('returns end of day', () => {
    const { serverDate, utcDate } = calculateDisplayDate(
      '2020-11-16',
      'America/New_York',
      'day'
    )

    expect(serverDate).toStrictEqual(new Date('2020-11-16T23:59:00.000Z'))
    expect(utcDate).toStrictEqual(new Date('2020-11-17T04:59:00.000Z'))
  })

  it('returns timezoned date', () => {
    const { serverDate, utcDate } = calculateDisplayDate(
      '2020-11-15 22:59:59',
      'America/New_York',
      'hour'
    )

    expect(serverDate).toStrictEqual(new Date('2020-11-15T22:59:59.000Z'))
    expect(utcDate).toStrictEqual(new Date('2020-11-16T03:59:59.000Z'))
  })
})
