import { GET_EMAIL_MESSAGE } from './get-email-message.lens.gql'

export const createEmailMessageMock = ({
  id,
  fromEmail = 'from@email.com',
  toEmails = ['to@email.com'],
  subject = 'Test Subject',
  body = 'Test Body'
}: {
  id: string
  fromEmail?: string
  toEmails?: string[]
  subject?: string
  body?: string
}) => ({
  request: {
    query: GET_EMAIL_MESSAGE,
    variables: { id }
  },
  result: {
    data: {
      emailMessage: {
        __typename: 'EmailMessage',
        body,
        categories: ['company'],
        from: {
          __typename: 'EmailAddress',
          blacklisted: false,
          email: fromEmail
        },
        id: '14913577',
        sentAt: '2019-10-14T15:00:00.000000+03:00',
        subject,
        to: toEmails.map(email => ({
          __typename: 'EmailAddress',
          blacklisted: false,
          email
        }))
      }
    }
  }
})

export const createEmailMessageFailedMock = (
  id: string,
  errorMessage: string
) => ({
  request: { query: GET_EMAIL_MESSAGE, variables: { id } },
  error: new Error(errorMessage)
})

export const createEmailMessageNotFoundMock = (id: string) => ({
  request: { query: GET_EMAIL_MESSAGE, variables: { id } },
  result: { data: { emailMessage: null } }
})
