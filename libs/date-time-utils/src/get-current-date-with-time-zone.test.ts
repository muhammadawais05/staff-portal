import { getCurrentDateWithTimeZone } from './get-current-date-with-time-zone'

describe('getCurrentDateWithTimeZone', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2022-02-02T00:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return current date with the defined timezone offset', () => {
    const result = getCurrentDateWithTimeZone('America/New_York')

    expect(result.toString()).toBe('Tue Feb 01 2022 19:00:00 GMT+0000 (Coordinated Universal Time)')
  })
})
