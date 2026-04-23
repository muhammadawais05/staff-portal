import {
  DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE,
  DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
} from '@staff-portal/config'
import {
  gql,
  ApolloClient,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetIndustriesAutocompleteDocument,
  GetIndustriesAutocompleteQuery,
  GetIndustriesAutocompleteQueryVariables
} from './get-industries-autocomplete.staff.gql.types'

export default gql`
  query GetIndustriesAutocomplete($term: String!, $offset: Int!, $limit: Int!) {
    autocomplete(
      filter: { term: $term, model: INDUSTRIES }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...IndustryEdgeFragment
      }
    }
  }

  fragment IndustryEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      id
    }
    nodeTypes
  }
`

export const useGetIndustriesAutocomplete = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetIndustriesAutocompleteDocument,
    {
      fetchPolicy: 'no-cache',
      canonizeResults: false,
      onError
    }
  )

  const getIndustries = ({
    term,
    offset = 0,
    limit = DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    term: string
  } & Partial<GetIndustriesAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit } })

  return {
    getIndustries,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}

export const getIndustriesAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query<
    GetIndustriesAutocompleteQuery,
    GetIndustriesAutocompleteQueryVariables
  >({
    query: GetIndustriesAutocompleteDocument,
    variables: { term, limit, offset: 0 },
    fetchPolicy: 'cache-first'
  })

  return { data: data?.autocomplete.edges, ...options }
}
