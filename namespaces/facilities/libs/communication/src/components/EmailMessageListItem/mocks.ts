import { EmailMessageWithUsers } from '../../types'

export const createEmailMessageWithUsersMock = (
  partialEmailWithUsers: Omit<
    Partial<EmailMessageWithUsers>,
    'from' | 'to'
  > = {}
): EmailMessageWithUsers => {
  const fromEmailMock = 'TEST_EMAIL_FROM'
  const toEmailMock = 'TEST_EMAIL_TO'

  return {
    __typename: 'EmailMessage',
    id: '123',
    body: 'TEST_BODY',
    from: partialEmailWithUsers.fromWithUser || {
      __typename: 'EmailAddress',
      email: fromEmailMock,
      path: '/test-path',
      blacklisted: false
    },
    fromWithUser: {
      __typename: 'EmailAddress',
      email: fromEmailMock,
      blacklisted: false
    },
    to: partialEmailWithUsers.toWithUsers || [
      {
        __typename: 'EmailAddress',
        email: toEmailMock,
        blacklisted: false
      }
    ],
    toWithUsers: [
      {
        __typename: 'EmailAddress',
        email: toEmailMock,
        blacklisted: false
      }
    ],
    categories: [],
    sentAt: '',
    ...partialEmailWithUsers
  }
}
