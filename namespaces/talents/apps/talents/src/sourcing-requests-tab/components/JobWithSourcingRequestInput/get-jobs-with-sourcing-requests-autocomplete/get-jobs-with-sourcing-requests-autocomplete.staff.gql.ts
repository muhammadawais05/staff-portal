import { DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetJobsWithSourcingRequestsAutocompleteDocument,
  GetJobsWithSourcingRequestsAutocompleteQueryVariables
} from './get-jobs-with-sourcing-requests-autocomplete.staff.gql.types'

export const GET_JOBS_WITH_SOURCING_REQUESTS_AUTOCOMPLETE: typeof GetJobsWithSourcingRequestsAutocompleteDocument = gql`
  query GetJobsWithSourcingRequestsAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: JOBS_WITH_SOURCING_REQUESTS }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...JobAutocompleteEdgeFragment
      }
    }
  }

  fragment JobAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ... on Job {
        id
      }
    }
  }
`

export const useGetJobsWithSourcingRequestsAutocomplete = () => {
  const [fetch, { data, loading }] = useLazyQuery(
    GET_JOBS_WITH_SOURCING_REQUESTS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getJobsWithSourcingRequests = ({
    term,
    offset = 0,
    limit = DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    term: string
  } & Partial<GetJobsWithSourcingRequestsAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit } })

  return {
    getJobsWithSourcingRequests,
    data: data?.autocomplete.edges ?? null,
    loading
  }
}
