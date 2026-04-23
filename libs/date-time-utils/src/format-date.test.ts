import formatDate from './format-date'

describe('formatDate', () => {
  it('should format with default date format', () => {
    const date = new Date(2020, 6, 22, 20, 10, 54)
    const result = formatDate(date)

    expect(result).toBe('Jul 22, 2020')
  })

  it('should format with passed date format', () => {
    const date = new Date(2020, 6, 22, 20, 10, 54)
    const dateFormat = 'yyyy dd HH:mm'
    const result = formatDate(date, {
      dateFormat
    })

    expect(result).toBe('2020 22 20:10')
  })

  it('should format with passed timezone', () => {
    const date = new Date(2020, 6, 22, 20, 10, 54)
    const dateFormat = 'HH:mm'
    const timeZone = '-05:00'
    const result = formatDate(date, {
      dateFormat,
      timeZone
    })

    expect(result).toBe('15:10')
  })
})
