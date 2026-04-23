import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { ApolloClient, gql } from '@staff-portal/data-layer-service'

import {
  GetSearchBarUserAutocompleteQuery,
  GetSearchBarUserAutocompleteQueryVariables
} from './get-search-bar-user-autocomplete.staff.gql.types'

export const GET_SEARCH_BAR_USER_AUTOCOMPLETE = gql`
  query GetSearchBarUserAutocomplete($term: String!, $limit: Int!) {
    autocomplete(
      filter: { model: USERS, term: $term }
      pagination: { limit: $limit, offset: 0 }
    ) {
      edges {
        key
        label
        labelHighlight
        nodeTypes
        node {
          ...SearchBarAutocompleteRoleFragment
          ...SearchBarAutocompleteClientFragment
        }
      }
      totalCount
    }
  }

  fragment SearchBarAutocompleteRoleFragment on Role {
    id
    userLegacyId
    contacts(filter: { type: [EMAIL] }) {
      nodes {
        id
        value
      }
    }
  }

  fragment SearchBarAutocompleteClientFragment on Client {
    id
    userLegacyId
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

export const getSearchBarUserAutocomplete =
  () =>
  async (
    term: string,
    limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    client: ApolloClient<object>
  ) => {
    const { data, errors } = await client.query<
      GetSearchBarUserAutocompleteQuery,
      GetSearchBarUserAutocompleteQueryVariables
    >({
      query: GET_SEARCH_BAR_USER_AUTOCOMPLETE,
      variables: { limit, term },
      fetchPolicy: 'cache-first'
    })

    const users = data?.autocomplete.edges

    return {
      data: users,
      errors
    }
  }
