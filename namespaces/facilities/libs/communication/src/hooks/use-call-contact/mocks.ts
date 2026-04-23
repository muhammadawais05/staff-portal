import { UserError } from '@staff-portal/graphql/staff'

import { CallContactMutationVariables } from './use-call-contact.staff.gql.types'
import { CALL_CONTACT } from './use-call-contact.staff.gql'

export const createCallContactMock = ({
  input,
  externalCallUrl = null
}: {
  input: CallContactMutationVariables['input']
  externalCallUrl?: string | null
}) => ({
  request: { query: CALL_CONTACT, variables: { input } },
  result: {
    data: {
      callContact: {
        success: true,
        errors: [],
        externalCallUrl,
        __typename: 'MutationResult'
      }
    }
  }
})

export const createCallContactInvalidMock = ({
  input,
  errors = []
}: {
  input: CallContactMutationVariables['input']
  errors?: UserError[]
}) => ({
  request: { query: CALL_CONTACT, variables: { input } },
  result: {
    data: {
      callContact: {
        success: false,
        externalCallUrl: null,
        errors: errors.map(error => ({
          ...error,
          __typename: 'UserError'
        })),
        __typename: 'MutationResult'
      }
    }
  }
})

export const createCallContactFailedMock = ({
  input
}: {
  input: CallContactMutationVariables['input']
}) => ({
  request: { query: CALL_CONTACT, variables: { input } },
  error: new Error('Network error occurred')
})
