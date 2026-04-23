import { getFormattedDateRange } from './get-formatted-date-range'

jest.mock('./parse-and-format-date', () => ({
  __esModule: true,
  default: (date: string) => date
}))

describe('getFormattedDateRange', () => {
  it('returns both dates', () => {
    expect(
      getFormattedDateRange({
        startDate: '2020-04-20',
        endDate: '2020-04-26'
      })
    ).toEqual({
      prefix: '',
      period: '2020-04-20 - 2020-04-26'
    })
  })

  it('returns startDate and prefix', () => {
    expect(
      getFormattedDateRange({
        startDate: '2020-04-20',
        endDate: null
      })
    ).toEqual({
      prefix: 'From',
      period: '2020-04-20'
    })

    expect(
      getFormattedDateRange({
        startDate: '2020-04-20',
        endDate: '2020-04-20'
      })
    ).toEqual({
      prefix: 'On',
      period: '2020-04-20'
    })
  })
})
