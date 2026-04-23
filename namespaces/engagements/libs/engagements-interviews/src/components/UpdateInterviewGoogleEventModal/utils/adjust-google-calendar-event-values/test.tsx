import { GoogleCalendarEventFragment } from '../../../../data/fragments/google-calendar-event-fragment'
import { adjustGoogleCalendarEventValues } from './adjust-google-calendar-event-values'

const arrangeTest = ({
  clientEmails,
  talentEmail,
  googleEvent
}: Partial<{
  clientEmails?: string[]
  talentEmail?: string
  googleEvent: Partial<GoogleCalendarEventFragment>
}> = {}) =>
  adjustGoogleCalendarEventValues({
    clientEmails,
    talentEmail,
    googleEvent: {
      summary: 'Event Title',
      description: 'Event Description',
      ...googleEvent
    }
  })

describe('adjustGoogleCalendarEventValues', () => {
  it('returns empty data', () => {
    const result = arrangeTest({
      googleEvent: { summary: '', description: '' }
    })

    expect(result).toStrictEqual({
      gcSummary: '',
      gcDescription: '',
      gcUserReceivers: [],
      gcEmails: ''
    })
  })

  it('returns only additional emails', () => {
    const result = arrangeTest({
      googleEvent: { attendees: ['test@test_1.test', 'test@test_2.test'] }
    })

    expect(result).toStrictEqual({
      gcSummary: 'Event Title',
      gcDescription: 'Event Description',
      gcUserReceivers: [],
      gcEmails: 'test@test_1.test, test@test_2.test'
    })
  })

  it('splits the user receivers and additional emails', () => {
    const result = arrangeTest({
      clientEmails: ['test@test_1.test'],
      googleEvent: { attendees: ['test@test_1.test', 'test@test_2.test'] }
    })

    expect(result).toStrictEqual({
      gcSummary: 'Event Title',
      gcDescription: 'Event Description',
      gcUserReceivers: ['test@test_1.test'],
      gcEmails: 'test@test_2.test'
    })
  })

  it('excludes the talent email', () => {
    const result = arrangeTest({
      talentEmail: 'test@test_3.test',
      clientEmails: ['test@test_1.test'],
      googleEvent: {
        attendees: ['test@test_1.test', 'test@test_2.test', 'test@test_3.test']
      }
    })

    expect(result).toStrictEqual({
      gcSummary: 'Event Title',
      gcDescription: 'Event Description',
      gcUserReceivers: ['test@test_1.test'],
      gcEmails: 'test@test_2.test'
    })
  })
  it('returns empty additional emails', () => {
    const result = arrangeTest({
      talentEmail: 'test@test_3.test',
      clientEmails: ['test@test_1.test', 'test@test_2.test'],
      googleEvent: {
        attendees: ['test@test_1.test', 'test@test_2.test', 'test@test_3.test']
      }
    })

    expect(result).toStrictEqual({
      gcSummary: 'Event Title',
      gcDescription: 'Event Description',
      gcUserReceivers: ['test@test_1.test', 'test@test_2.test'],
      gcEmails: ''
    })
  })
})
