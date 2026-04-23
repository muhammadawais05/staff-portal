import { GET_USERS_BY_EMAILS } from './get-users-by-emails.staff.gql'
import {
  GetUsersByEmailsQuery,
  GetUsersByEmailsQueryVariables
} from './get-users-by-emails.staff.gql.types'

export const createUsersByEmailsMock = (
  emails: string[],
  usersByEmails: {
    id?: string
    email: string
    fullName: string
    webResource: { url?: string | null }
  }[] = []
) => {
  const variables: GetUsersByEmailsQueryVariables = { filter: { emails } }
  const result = {
    data: {
      communicationTrackingRoles: {
        __typename: 'RoleOrClientNullableSimpleConnection',
        nodes: usersByEmails.map(
          ({ id, email, fullName, webResource }, index) => ({
            __typename: 'Staff',
            id: id || index.toString(),
            email,
            fullName,
            webResource: {
              ...webResource,
              __typename: 'Link'
            }
          })
        )
      }
    }
  } as { data: GetUsersByEmailsQuery }

  return {
    request: {
      query: GET_USERS_BY_EMAILS,
      variables
    },
    result
  }
}

export const createUsersByEmailsErrorMock = (emails: string[]) => ({
  request: {
    query: GET_USERS_BY_EMAILS,
    variables: { emails }
  },
  error: new Error('oh no')
})
