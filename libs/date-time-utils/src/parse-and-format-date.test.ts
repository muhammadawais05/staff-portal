import parseAndFormatDate, {
  parseAndFormatDateTime,
  parseAndFormatDateUTC
} from './parse-and-format-date'

describe('parse and format date', () => {
  describe('parseAndFormatDate', () => {
    it('default parse and format date', () => {
      const date = '2019-02-05T13:00:00.000000'
      const result = parseAndFormatDate(date)

      expect(result).toBe('Feb 5, 2019')
    })

    it('parse and format date with a specific format', () => {
      const date = '2019-02-05T13:00:00.000000'
      const result = parseAndFormatDate(date, {
        dateFormat: 'yyyy-MM-dd'
      })

      expect(result).toBe('2019-02-05')
    })

    it('parse and format date with a specific format and timeZone is undefined', () => {
      const date = '2019-02-05T13:00:00.000000'
      const result = parseAndFormatDate(date, {
        dateFormat: 'yyyy-MM-dd',
        timeZone: undefined
      })

      expect(result).toBe('2019-02-05')
    })

    it('parse and format date with a specific format and timezone', () => {
      const date = '2019-02-05T23:00:00.000000-11:00'
      const result = parseAndFormatDate(date, {
        dateFormat: 'yyyy-MM-dd',
        timeZone: 'Asia/Shanghai'
      })

      expect(result).toBe('2019-02-06')
    })
  })

  it('default parse and format date and time', () => {
    const date = '2019-02-05T13:00:00.000000'
    const result = parseAndFormatDateTime(date)

    expect(result).toBe('Feb 5, 2019 at 1:00 PM')
  })

  it('parse and format date and time with a specific format', () => {
    const date = '2019-02-05T13:35:00.000000'
    const result = parseAndFormatDateTime(date, {
      dateFormat: 'h:mm'
    })

    expect(result).toBe('1:35')
  })

  it('parse and format date and time with a specific format and timezone', () => {
    const date = '2019-02-05T10:00:00.000000-03:00'
    const result = parseAndFormatDateTime(date, {
      dateFormat: 'yyyy-MM-dd HH:mm',
      timeZone: 'Asia/Shanghai'
    })

    expect(result).toBe('2019-02-05 21:00')
  })

  it('default parse and format date and time UTC', () => {
    const date = '2019-02-05T13:00:00.000000+03:00'
    const result = parseAndFormatDateUTC(date)

    expect(result).toBe('Feb 5, 2019 at 10:00 AM')
  })

  it('parse and format date and time UTC with a specific format', () => {
    const date = '2019-02-05T13:33:00.000000+03:00'
    const result = parseAndFormatDateUTC(date, 'h:mm a')

    expect(result).toBe('10:33 AM')
  })
})
