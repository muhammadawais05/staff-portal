import getScheduledViaContent from './get-scheduled-via-content'

describe('getScheduledViaContent', () => {
  it('should return content for callbackRequest', () => {
    expect(
      getScheduledViaContent({ callbackRequest: { id: 'test-id', type: '' } })
    ).toBe('Call Request')
    expect(
      getScheduledViaContent({
        callbackRequest: { id: 'test-id', type: 'scheduled' }
      })
    ).toBe('Scheduled Call Request')
  })

  it('should return content for masterBookingPage', () => {
    expect(
      getScheduledViaContent({
        masterBookingPage: { id: '5', title: 'Test Title' }
      })
    ).toBe('Master Booking Page (Test Title)')
  })

  it('should return content for currentScheduler', () => {
    expect(
      getScheduledViaContent({
        currentScheduler: {
          id: 'test-id',
          code: 'TestCode',
          role: {
            id: 'test-id',
            type: 'test type',
            fullName: 'Test Name',
            email: 'test@email.com'
          }
        }
      })
    ).toBe('Booking Page')
  })

  it('should return Unknown if no properties provided', () => {
    expect(getScheduledViaContent({})).toBe('Unknown')
  })
})
