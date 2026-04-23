import getDateWithoutTimezone from './get-date-without-timezone'

describe('get date without timezone', () => {
  it('should remove timezone from the date if positive offset', () => {
    const dateString = '2020-06-22T20:10:54+08:00'
    const result = getDateWithoutTimezone(dateString)

    expect(result.getHours()).toBe(20)
  })

  it('should remove timezone from the date if negative offset', () => {
    const dateString = '2020-06-22T20:10:54-05:00'
    const result = getDateWithoutTimezone(dateString)

    expect(result.getHours()).toBe(20)
  })

  it('should remove timezone from the date if zero offset', () => {
    const dateString = '2020-06-22T20:10:54+00:00'
    const result = getDateWithoutTimezone(dateString)

    expect(result.getHours()).toBe(20)
  })
})
