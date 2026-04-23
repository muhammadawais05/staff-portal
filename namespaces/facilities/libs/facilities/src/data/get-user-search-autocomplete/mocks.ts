import { DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { GET_USER_SEARCH_AUTOCOMPLETE } from './get-user-search-autocomplete.staff.gql'

export const createGetUserSearchAutocompleteMock = ({
  term,
  edges,
  limit = DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE,
  model
}: {
  term: string
  edges: unknown[]
  limit?: number
  model: AutocompleteModels
}) => ({
  request: {
    query: GET_USER_SEARCH_AUTOCOMPLETE,
    variables: {
      term,
      model,
      limit,
      offset: 0
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
