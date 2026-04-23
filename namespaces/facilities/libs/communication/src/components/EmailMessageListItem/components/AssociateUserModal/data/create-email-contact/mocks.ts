import { UserError, CreateEmailContactInput } from '@staff-portal/graphql/staff'

import { CREATE_EMAIL_CONTACT } from './create-email-contact.staff.gql'

export const getCreateEmailContactMock = (input: CreateEmailContactInput) => ({
  request: {
    query: CREATE_EMAIL_CONTACT,
    variables: { input }
  },
  result: {
    data: {
      createEmailContact: {
        success: true,
        errors: [],
        __typename: 'CreateEmailContactPayload'
      }
    }
  }
})

export const getCreateEmailContactFailedMock = ({
  email,
  roleId,
  errorMessage
}: CreateEmailContactInput & { errorMessage: string }) => ({
  request: {
    query: CREATE_EMAIL_CONTACT,
    variables: { input: { email, roleId } }
  },
  error: new Error(errorMessage)
})

export const getCreateEmailContactInvalidMock = ({
  email,
  roleId,
  errors
}: CreateEmailContactInput & {
  errors: UserError[]
}) => ({
  request: {
    query: CREATE_EMAIL_CONTACT,
    variables: { input: { email, roleId } }
  },
  result: {
    data: {
      createEmailContact: {
        success: false,
        errors: errors.map(error => ({ ...error, __typename: 'UserError' })),
        __typename: 'CreateEmailContactPayload'
      }
    }
  }
})
