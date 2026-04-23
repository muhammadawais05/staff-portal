import { MockedResponse } from '@staff-portal/data-layer-service'

import { GET_EMAIL_MESSAGES_SEARCH_BAR_USERS } from './get-email-messages-search-bar-users.staff.gql'
import {
  EmailMessagesSearchBarRoleFragment,
  EmailMessagesSearchBarClientFragment,
  GetEmailMessagesSearchBarUsersQuery,
  GetEmailMessagesSearchBarUsersQueryVariables
} from './get-email-messages-search-bar-users.staff.gql.types'

export const createGetEmailMessagesSearchBarUsersMock = (
  variables: GetEmailMessagesSearchBarUsersQueryVariables,
  partialUsers: Partial<
    EmailMessagesSearchBarRoleFragment | EmailMessagesSearchBarClientFragment
  >[]
): MockedResponse => {
  const users: (
    | EmailMessagesSearchBarRoleFragment
    | EmailMessagesSearchBarClientFragment
  )[] = partialUsers.map((partialUser, index) => ({
    id: `default-test-id-${index}`,
    userLegacyId: index,
    fullName: 'Default test fullName',
    type: 'Talent',
    email: 'a@b.c',
    contacts: { nodes: [], __typename: 'ContactConnection' },
    __typename: 'Talent',
    ...partialUser
  }))
  const data: GetEmailMessagesSearchBarUsersQuery = { staffNodes: users }

  return {
    request: { query: GET_EMAIL_MESSAGES_SEARCH_BAR_USERS, variables },
    result: { data }
  }
}
