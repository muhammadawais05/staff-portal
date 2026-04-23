import { GetMailboxesQueryVariables } from './get-mailboxes.lens.gql.types'
import { GET_MAILBOXES } from './get-mailboxes.lens.gql'

export const createGetMailboxesMock = (
  variables: GetMailboxesQueryVariables
) => {
  const getMailboxesMock = {
    mailboxes: {
      entities: (variables.emails as string[]).map(email => ({
        id: '123',
        email,
        __typename: 'EmailAddress'
      })),
      __typename: 'MailboxList'
    }
  }

  return {
    request: { query: GET_MAILBOXES, variables },
    result: { data: getMailboxesMock }
  }
}

export const createGetMailboxesEmptyMock = (
  variables: GetMailboxesQueryVariables
) => {
  const getMailboxesMock = {
    mailboxes: {
      entities: [],
      __typename: 'MailboxList'
    }
  }

  return {
    request: { query: GET_MAILBOXES, variables },
    result: { data: getMailboxesMock }
  }
}
