import { createEmailMessageFragmentMock } from '@staff-portal/communication/src/mocks'

import { GET_LATEST_EMAIL_MESSAGE } from './get-latest-email-message.lens.gql'

export const createGetLatestEmailMessageMock = ({
  emails,
  id,
  body,
  fromEmail,
  toEmail
}: {
  emails: string[]
  id?: string
  body?: string
  fromEmail?: string
  toEmail?: string
}) => ({
  request: {
    query: GET_LATEST_EMAIL_MESSAGE,
    variables: {
      emails: emails
    }
  },
  result: {
    data: {
      roleLatestEmailMessage: createEmailMessageFragmentMock({
        id: id || '123',
        body,
        from: {
          __typename: 'EmailAddress',
          blacklisted: false,
          email: fromEmail || 'neil-8d89afe2b72ef173@toptal.io'
        },
        to: [
          {
            __typename: 'EmailAddress',
            blacklisted: false,
            email: toEmail || 'nick-355ae9ea64d6bbc2@toptal.io'
          }
        ]
      })
    }
  }
})

export const createGetLatestEmailMessageEmptyMock = ({
  emails
}: {
  emails: string[]
}) => ({
  request: {
    query: GET_LATEST_EMAIL_MESSAGE,
    variables: { emails }
  },
  result: { data: { roleLatestEmailMessage: null } }
})

export const createGetLatestEmailMessageErrorMock = (email: string) => ({
  request: {
    query: GET_LATEST_EMAIL_MESSAGE,
    variables: { emails: [email] }
  },
  error: new Error('Oops!')
})
