import { convertTime } from './utils'

describe('JobTimeZoneDetailsField/utils', () => {
  it('convertTime with 24:00:00', async () => {
    const result = convertTime('24:00:00')

    expect(result).toBe('12:00 AM')
  })

  it('convertTime with regular time string', async () => {
    const result = convertTime('13:00:00')

    expect(result).toBe('1:00 PM')
  })
})
