import { DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetUserSearchAutocompleteDocument,
  GetUserSearchAutocompleteQueryVariables
} from './get-user-search-autocomplete.staff.gql.types'

export const GET_USER_SEARCH_AUTOCOMPLETE: typeof GetUserSearchAutocompleteDocument = gql`
  query GetUserSearchAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
    $model: AutocompleteModels!
  ) {
    autocomplete(
      filter: { model: $model, term: $term }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...UserSearchAutocompleteFragment
      }
    }
  }

  fragment UserSearchAutocompleteFragment on AutocompleteEdge {
    key
    node {
      id
      ... on WebResource {
        webResource {
          url
        }
      }
      ... on Client {
        status
      }
    }
    nodeTypes
    nodeTypeTitles
    label
    labelHighlight
    photo {
      thumb
    }
  }
`

export const useGetUserSearchAutocomplete = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_USER_SEARCH_AUTOCOMPLETE,
    {
      fetchPolicy: 'no-cache',
      canonizeResults: false,
      onError
    }
  )

  const getUsers = ({
    term,
    offset = 0,
    model,
    limit = DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    term: string
    model: AutocompleteModels
  } & Partial<GetUserSearchAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit, model } })

  return {
    getUsers,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
