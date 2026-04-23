import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetUserFieldAutocompleteDocument,
  GetUserFieldAutocompleteQueryVariables
} from './get-user-field-autocomplete.staff.gql.types'

export const GET_USER_FIELD_AUTOCOMPLETE = gql`
  query GetUserFieldAutocomplete($term: String!, $offset: Int!, $limit: Int!) {
    autocomplete(
      filter: { term: $term, model: USERS }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...UserFieldAutocompleteEdgeFragment
      }
    }
  }

  fragment UserFieldAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    photo {
      thumb
    }
    node {
      id
    }
  }
`

export const useGetUserFieldAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetUserFieldAutocompleteDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getUsers = ({
    term,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: { term: string } & Partial<GetUserFieldAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit } })

  return {
    getUsers,
    data: data?.autocomplete?.edges ?? [],
    ...options
  }
}
