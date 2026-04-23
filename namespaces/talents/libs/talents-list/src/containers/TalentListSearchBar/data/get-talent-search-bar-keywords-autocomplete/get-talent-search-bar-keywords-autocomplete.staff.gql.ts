import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import {
  GetTalentSearchBarKeywordsAutocompleteDocument,
  GetTalentSearchBarKeywordsAutocompleteQuery,
  GetTalentSearchBarKeywordsAutocompleteQueryVariables
} from './get-talent-search-bar-keywords-autocomplete.staff.gql.types'

export default gql`
  query GetTalentSearchBarKeywordsAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
    $model: AutocompleteModels = TALENT_SEARCH_KEYWORDS
  ) {
    autocomplete(
      filter: { term: $term, model: $model, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TalentSearchBarKeywordAutocompleteEdge
      }
    }
  }

  fragment TalentSearchBarKeywordAutocompleteEdge on AutocompleteEdge {
    key
    label
    labelHighlight
    entityType
    node {
      id
    }
    nodeTypes
  }
`

export const useGetTalentSearchBarKeywordsAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => {
  const [getTalentSearchBarKeywordsAutocomplete, { data, ...options }] =
    useLazyQuery(GetTalentSearchBarKeywordsAutocompleteDocument, {
      fetchPolicy: 'cache-first'
    })

  const getKeywords = (term = '', excludedIds?: string[]) =>
    getTalentSearchBarKeywordsAutocomplete({
      variables: {
        term,
        excludedIds,
        offset,
        limit
      }
    })

  return {
    getKeywords,
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getTalentSearchBarKeywordsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>,
  model?: AutocompleteModels
  // eslint-disable-next-line max-params
) => {
  const { data, ...options } = await client.query<
    GetTalentSearchBarKeywordsAutocompleteQuery,
    GetTalentSearchBarKeywordsAutocompleteQueryVariables
  >({
    query: GetTalentSearchBarKeywordsAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0,
      model
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}

export const getTalentApplicantSearchBarKeywordsAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) =>
  getTalentSearchBarKeywordsAutocomplete(
    term,
    limit,
    client,
    AutocompleteModels.APPLICANT_TALENT_SEARCH_KEYWORDS
  )
