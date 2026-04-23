import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { GET_SEARCH_BAR_USER_AUTOCOMPLETE } from './get-search-bar-user-autocomplete.staff.gql'
import { AutocompleteUser } from '../../../../types'

const defaultEdge = {
  label: 'Test Name',
  nodeTypes: ['staff'],
  labelHighlight: null,
  node: {
    id: encodeEntityId('1000', 'Staff'),
    userLegacyId: 1000,
    contacts: {
      nodes: [],
      __typename: 'ContactConnection'
    },
    __typename: 'Staff'
  },
  __typename: 'AutocompleteEdge'
}

export const createGetUserAutocompleteMock = ({
  term,
  results = []
}: {
  term: string
  results: (Partial<Omit<AutocompleteUser, 'node'>> & {
    node?: Partial<AutocompleteUser['node']>
  })[]
}) => ({
  request: {
    query: GET_SEARCH_BAR_USER_AUTOCOMPLETE,
    variables: { term, limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE }
  },
  result: {
    data: {
      autocomplete: {
        edges: results.map(edge => ({
          ...defaultEdge,
          ...edge,
          node: {
            ...defaultEdge.node,
            ...edge.node
          }
        })),
        totalCount: results.length,
        __typename: 'AutocompleteConnection'
      },
      __typename: 'Query'
    }
  }
})

export const createGetUserAutocompleteFailedMock = ({
  term,
  errorMessage
}: {
  term: string
  errorMessage: string
}) => ({
  request: {
    query: GET_SEARCH_BAR_USER_AUTOCOMPLETE,
    variables: { term, limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE }
  },
  error: new Error(errorMessage)
})
