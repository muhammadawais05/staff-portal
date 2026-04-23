import { UserError } from '@staff-portal/graphql/staff'

import { SendEmailMutationVariables } from './send-email.staff.gql.types'
import { SEND_EMAIL } from './send-email.staff.gql'

const defaultInput = {
  title: 'Mocked title',
  body: 'Mocked body',
  cc: [],
  emailTemplateId: null,
  toId: 'abc123',
  taskIds: []
}

export const createSendEmailMock = (
  input: Partial<SendEmailMutationVariables['input']>
) => ({
  request: {
    query: SEND_EMAIL,
    variables: {
      input: { ...defaultInput, ...input }
    }
  },
  result: {
    data: {
      sendEmailTo: { __typename: 'MutationResult', success: true, errors: [] }
    }
  }
})

export const createSendEmailFailedMock = (
  input: Partial<SendEmailMutationVariables['input']>
) => ({
  request: {
    query: SEND_EMAIL,
    variables: {
      input: { ...defaultInput, ...input }
    }
  },
  error: new Error('Network error occurred')
})

export const createSendEmailInvalidMock = (
  input: Partial<SendEmailMutationVariables['input']>,
  errors: UserError[]
) => ({
  request: {
    query: SEND_EMAIL,
    variables: {
      input: { ...defaultInput, ...input }
    }
  },
  result: {
    data: {
      sendEmailTo: {
        success: false,
        errors,
        __typename: 'SendEmailPayload'
      }
    }
  }
})
