import { GetAllEmailMessagesQueryVariables } from './get-all-email-messages.lens.gql.types'
import { GET_ALL_EMAIL_MESSAGES } from './get-all-email-messages.lens.gql'

export const createGetEmailMessagesListMock = (
  emails: {
    body: string
    fromEmail: string
    toEmail: string
    id: string
    subject: string
  }[],
  variables?: GetAllEmailMessagesQueryVariables,
  totalCount = 1
) => {
  const entities = emails.map(email => ({
    __typename: 'EmailMessage',
    subject: email.subject,
    from: {
      email: email.fromEmail,
      blacklisted: false,
      __typename: 'EmailAddress'
    },
    to: [
      {
        email: email.toEmail,
        blacklisted: false,
        __typename: 'EmailAddress'
      }
    ],
    categories: ['company', 'internal'],
    body: email.body,
    sentAt: '2019-09-17T12:44:00.000000+03:00',
    id: email.id
  }))

  return {
    request: {
      query: GET_ALL_EMAIL_MESSAGES,
      variables
    },
    result: {
      data: {
        emailMessages: {
          __typename: 'EmailMessageList',
          entities,
          maxCount: 10000,
          totalCount
        }
      }
    }
  }
}
