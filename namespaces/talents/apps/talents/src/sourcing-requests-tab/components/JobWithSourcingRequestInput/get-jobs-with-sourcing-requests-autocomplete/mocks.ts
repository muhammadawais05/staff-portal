import { DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { GET_JOBS_WITH_SOURCING_REQUESTS_AUTOCOMPLETE } from './get-jobs-with-sourcing-requests-autocomplete.staff.gql'

export const createGetJobsWithSourcingRequestsAutocompleteMock = ({
  term,
  edges
}: {
  term: string
  edges: unknown[]
}): MockedResponse => ({
  request: {
    query: GET_JOBS_WITH_SOURCING_REQUESTS_AUTOCOMPLETE,
    variables: {
      term: term,
      offset: 0,
      limit: DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE
    }
  },
  result: {
    data: {
      autocomplete: {
        edges,
        __typename: 'AutocompleteConnection'
      },
      __typename: 'Query'
    }
  }
})
