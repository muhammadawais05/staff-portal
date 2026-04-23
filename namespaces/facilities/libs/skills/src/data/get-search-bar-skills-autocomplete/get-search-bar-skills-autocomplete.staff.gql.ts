import { useCallback } from 'react'
import {
  ApolloClient,
  ApolloError,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetSearchBarSkillsAutocompleteDocument,
  GetSearchBarSkillsAutocompleteQuery,
  GetSearchBarSkillsAutocompleteQueryVariables
} from './get-search-bar-skills-autocomplete.staff.gql.types'

const DEFAULT_AUTOCOMPLETE_RESULTS_SIZE = 6

export default gql`
  query GetSearchBarSkillsAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: SKILL_NAMES, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...SearchBarSkillAutocompleteEdgeFragment
      }
    }
  }

  fragment SearchBarSkillAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

interface Props {
  limit?: number
  offset?: number
  onError?: (error: ApolloError) => void
}

export const useGetSearchBarSkillsAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0,
  onError
}: Props = {}) => {
  const [getSearchBarSkillsAutocomplete, { data, ...options }] = useLazyQuery(
    GetSearchBarSkillsAutocompleteDocument,
    {
      fetchPolicy: 'cache-first',
      onError
    }
  )

  const fetchData = useCallback((term = '', excludedIds?: string[]) => {
    getSearchBarSkillsAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    fetchData,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getSearchBarSkillsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetSearchBarSkillsAutocompleteQuery,
    GetSearchBarSkillsAutocompleteQueryVariables
  >({
    query: GetSearchBarSkillsAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}
