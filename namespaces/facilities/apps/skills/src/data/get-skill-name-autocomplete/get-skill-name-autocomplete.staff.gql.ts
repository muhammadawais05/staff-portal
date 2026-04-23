import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetSkillNamesAutocompleteDocument,
  GetSkillNamesAutocompleteQueryVariables
} from './get-skill-name-autocomplete.staff.gql.types'

export default gql`
  query GetSkillNamesAutocomplete(
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
        ...SkillNameEdgeFragment
      }
    }
  }

  fragment SkillNameEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const getSearchBarSkillNamesAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetSkillNamesAutocompleteDocument,
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

export const useGetSkillNamesAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetSkillNamesAutocompleteDocument,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getSkillNames = ({
    term,
    excludedIds,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: { term: string } & Partial<GetSkillNamesAutocompleteQueryVariables>) =>
    fetch({ variables: { term, excludedIds, offset, limit } })

  return {
    getSkillNames,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
