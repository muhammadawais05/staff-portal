import getFormattedFlaggedByCopy from './get-formatted-flagged-by-copy'

describe('getFormattedFlaggedByCopy', () => {
  it('returns "Added by System on" flagged copy', () => {
    expect(
      getFormattedFlaggedByCopy({
        createdAt: '2020-04-14T19:26:29+03:00',
        updatedAt: '2020-04-14T19:26:29+03:00'
      })
    ).toBe('Added by System on Apr 14, 2020')
  })

  it('returns "Updated by System on" flagged copy', () => {
    expect(
      getFormattedFlaggedByCopy({
        createdAt: '2020-04-14T19:26:29+03:00',
        updatedAt: '2020-04-15T19:26:29+03:00'
      })
    ).toBe('Updated by System on Apr 15, 2020')
  })

  it('returns "Updated by UserName on" flagged copy', () => {
    expect(
      getFormattedFlaggedByCopy(
        {
          createdAt: '2020-04-14T20:59:59+03:00',
          updatedAt: '2020-04-15T20:59:59+03:00'
        },
        'UserName'
      )
    ).toBe('Updated by UserName on Apr 15, 2020')
  })

  it('returns "Updated by UserName on" flagged copy for a TimeZone (+10)', () => {
    expect(
      getFormattedFlaggedByCopy(
        {
          createdAt: '2020-04-14T20:59:59+03:00',
          updatedAt: '2020-04-15T20:59:59+03:00',
          timeZone: 'Australia/Melbourne'
        },
        'UserName'
      )
    ).toBe('Updated by UserName on Apr 16, 2020')
  })
})
