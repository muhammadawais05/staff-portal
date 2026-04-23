import { useCallback, useState } from 'react'
import { GraphQLError } from 'graphql'
import {
  ApolloClient,
  gql,
  useApolloClient,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { isNotNullish } from '@staff-portal/utils'

import {
  GetEmailMessagesSearchBarUsersQuery,
  GetEmailMessagesSearchBarUsersQueryVariables
} from './get-email-messages-search-bar-users.staff.gql.types'

export const GET_EMAIL_MESSAGES_SEARCH_BAR_USERS = gql`
  query GetEmailMessagesSearchBarUsers($userIds: [ID!]!) {
    staffNodes(ids: $userIds) {
      ...EmailMessagesSearchBarRoleFragment
      ...EmailMessagesSearchBarClientFragment
    }
  }

  fragment EmailMessagesSearchBarRoleFragment on Role {
    id
    userLegacyId
    fullName
    email
    type
    contacts(filter: { type: [EMAIL] }) {
      nodes {
        id
        value
      }
    }
  }
  fragment EmailMessagesSearchBarClientFragment on Client {
    id
    userLegacyId
    fullName
    email
    type
    representatives {
      nodes {
        id
        contacts(filter: { type: EMAIL }) {
          nodes {
            id
            value
          }
        }
      }
    }
  }
`

const mapDataToItems = (
  data: GetEmailMessagesSearchBarUsersQuery | undefined
) =>
  data?.staffNodes
    .filter(isNotNullish)
    .map(node => ({ ...node, text: String(node.userLegacyId) }))

export const useGetEmailMessagesSearchBarUsers = () => {
  const client = useApolloClient()

  const getEmailMessagesSearchBarUsers = useCallback(
    (variables: GetEmailMessagesSearchBarUsersQueryVariables) =>
      client.query<
        GetEmailMessagesSearchBarUsersQuery,
        GetEmailMessagesSearchBarUsersQueryVariables
      >({
        query: GET_EMAIL_MESSAGES_SEARCH_BAR_USERS,
        fetchPolicy: 'cache-first',
        variables
      }),
    [client]
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<GraphQLError>()

  const getItems = useCallback(
    async (userIds: string[]) => {
      const encodedUserIds = userIds.map(userId =>
        encodeEntityId(userId, 'User')
      )

      setLoading(true)
      const { data, errors } = await getEmailMessagesSearchBarUsers({
        userIds: encodedUserIds
      })

      if (errors) {
        setError(errors[0])
      }
      setLoading(false)

      return { data: mapDataToItems(data) }
    },
    [getEmailMessagesSearchBarUsers]
  )

  return { getItems, error, loading }
}

export const getEmailMessagesSearchBarUsers = async (
  client: ApolloClient<object>,
  userIds: string[]
) => {
  const encodedUserIds = userIds.map(userId => encodeEntityId(userId, 'User'))

  const { data, errors } = await client.query<
    GetEmailMessagesSearchBarUsersQuery,
    GetEmailMessagesSearchBarUsersQueryVariables
  >({
    query: GET_EMAIL_MESSAGES_SEARCH_BAR_USERS,
    variables: { userIds: encodedUserIds }
  })

  // TODO: Will be solved as part of Authorization Guards support
  // https://toptal-core.atlassian.net/browse/SPT-593
  const users = data?.staffNodes.filter(isNotNullish)

  return {
    data: users,
    errors: errors
  }
}
