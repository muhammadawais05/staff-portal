import { GetEmailMessagesListQueryVariables } from './get-email-messages-list.lens.gql.types'
import { GET_EMAIL_MESSAGES_LIST } from './get-email-messages-list.lens.gql'

export const createGetEmailMessagesListMock = (
  variables?: GetEmailMessagesListQueryVariables,
  {
    body = 'default email message body',
    fromEmail = '–',
    toEmail = '–',
    totalCount = 0,
    id = '395847',
    subject = '–'
  }: {
    body?: string
    fromEmail?: string
    toEmail?: string
    totalCount?: number
    id?: string
    subject?: string
  } = {}
) => ({
  request: {
    query: GET_EMAIL_MESSAGES_LIST,
    variables
  },
  result: {
    data: {
      emailMessages: {
        __typename: 'EmailMessageList',
        entities: [
          {
            __typename: 'EmailMessage',
            subject,
            from: {
              email: fromEmail,
              blacklisted: false,
              __typename: 'EmailAddress'
            },
            to: [
              {
                email: toEmail,
                blacklisted: false,
                __typename: 'EmailAddress'
              }
            ],
            categories: ['company', 'internal'],
            body,
            sentAt: '2019-09-17T12:44:00.000000+03:00',
            id
          }
        ],
        maxCount: 10000,
        totalCount
      }
    }
  }
})

export const createGetEmailMessagesListNoResultsMock = (
  variables: GetEmailMessagesListQueryVariables
) => ({
  request: {
    query: GET_EMAIL_MESSAGES_LIST,
    variables
  },
  result: {
    data: {
      emailMessages: {
        __typename: 'EmailMessageList',
        entities: [],
        maxCount: 10000,
        totalCount: 10000
      }
    }
  }
})

export const createGetEmailMessagesListErrorMock = (
  variables: GetEmailMessagesListQueryVariables,
  errorMessage = ''
) => ({
  request: { query: GET_EMAIL_MESSAGES_LIST, variables },
  error: new Error(errorMessage)
})
