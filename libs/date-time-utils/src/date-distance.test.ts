import dateDistance from './date-distance'

describe('date-distance', () => {
  it('default', () => {
    const result = dateDistance('', '')

    expect(result).toBe('')
  })

  it('should display minute', () => {
    const start = '2019-09-17T13:00:00.000000+03:00'
    const end = '2019-09-17T13:01:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('1 minute')
  })

  it('should display minutes', () => {
    const start = '2019-09-17T13:00:00.000000+03:00'
    const end = '2019-09-17T13:15:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('15 minutes')
  })

  it('should display hour', () => {
    const start = '2019-09-17T13:00:00.000000+03:00'
    const end = '2019-09-17T14:00:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('1 hour')
  })

  it('should display hours', () => {
    const start = '2019-09-17T13:00:00.000000+03:00'
    const end = '2019-09-17T15:00:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('2 hours')
  })

  it('should display hours and minutes', () => {
    const start = '2019-09-17T13:15:00.000000+03:00'
    const end = '2019-09-17T15:45:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('2 hours and 30 minutes')
  })

  it('should display hour and minutes', () => {
    const start = '2019-09-17T13:15:00.000000+03:00'
    const end = '2019-09-17T15:00:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('1 hour and 45 minutes')
  })

  it('should display hour and minute', () => {
    const start = '2019-09-17T13:59:00.000000+03:00'
    const end = '2019-09-17T15:00:00.000000+03:00'
    const result = dateDistance(start, end)

    expect(result).toBe('1 hour and 1 minute')
  })
})
