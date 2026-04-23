import generateTimezoneOffset from './generate-timezone-offset'

describe('generateTimezoneOffset', () => {
  it('should return timezone offset', () => {
    const seconds = 0
    const result = generateTimezoneOffset(seconds)

    expect(result).toBe('GMT+00:00')
  })

  it('should return offset with a minus value', () => {
    const seconds = -18000
    const result = generateTimezoneOffset(seconds)

    expect(result).toBe('GMT-05:00')
  })

  it('should return offset in UTC time standard', () => {
    const seconds = 18000
    const timeStandard = 'UTC'
    const result = generateTimezoneOffset(seconds, timeStandard)

    expect(result).toBe('UTC+05:00')
  })
})
