import { prepareGoogleInvitation } from './prepare-google-invitation'

describe('prepareGoogleInvitation', () => {
  it('returns google invitation data', () => {
    const EVENT_DESCRIPTION = 'Event Description'
    const EVENT_TITLE = 'Event Title'

    const result = prepareGoogleInvitation({
      description: EVENT_DESCRIPTION,
      summary: EVENT_TITLE,
      userReceivers: ['test_1@test.test', 'test_2@test.test'],
      emails: 'test@test.test, test_1@test.test'
    })

    expect(result).toStrictEqual({
      description: EVENT_DESCRIPTION,
      summary: EVENT_TITLE,
      userReceivers: ['test_1@test.test', 'test_2@test.test'],
      emails: 'test@test.test'
    })
  })
})
