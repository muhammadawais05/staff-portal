import { displayDate } from './date'

describe('Core utils', () => {
  it('displayDate() should display date in specific format and using default timezone', () => {
    expect(
      displayDate(new Date('2020-07-10T07:00:00'), 'MMM d, h:mm a')
    ).toBe('Jul 10, 7:00 AM')
  })

  it('displayDate() should display date in specific format and using specified timezone', () => {
    expect(
      displayDate(
        new Date('2020-07-10T07:00:00'),
        'MMM d, yyyy hh:mm',
        'Pacific/Easter'
      )
    ).toBe('Jul 10, 2020 01:00')
  })
})
