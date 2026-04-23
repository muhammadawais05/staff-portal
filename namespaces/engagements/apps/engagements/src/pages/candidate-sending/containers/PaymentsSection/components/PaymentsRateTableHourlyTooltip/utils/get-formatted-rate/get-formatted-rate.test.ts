import getFormattedRate from './get-formatted-rate'

jest.mock('@staff-portal/string', () => ({
  formatAmount: () => '$1,000.00'
}))

describe('getFormattedRate', () => {
  it.each([
    { rate: 1000, expectedString: '$1,000.00/hr', suffix: 'hr' },
    { rate: 1000, expectedString: '$1,000.00' }
  ])('correctly format rate', ({ rate, expectedString, suffix }) => {
    expect(getFormattedRate({ rate, suffix })).toBe(expectedString)
  })
})
