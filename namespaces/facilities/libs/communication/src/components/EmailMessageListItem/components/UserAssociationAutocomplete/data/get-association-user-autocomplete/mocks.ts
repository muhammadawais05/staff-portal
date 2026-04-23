import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  GET_ASSOCIATION_USER_AUTOCOMPLETE,
  AssociationAutocompleteUser
} from './get-association-user-autocomplete.staff.gql'

const defaultEdge = {
  label: 'Test Name',
  nodeTypes: ['staff'],
  photo: null,
  labelHighlight: null,
  node: {
    id: encodeEntityId('1000', 'Staff'),
    userLegacyId: 1000,
    webResource: {
      url: 'https://staging.toptal.net/platform/staff/staff/100010',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  __typename: 'AutocompleteEdge'
}

export const createGetAssociationUserAutocompleteMock = ({
  term,
  results = []
}: {
  term: string
  results: (Partial<Omit<AssociationAutocompleteUser, 'node'>> & {
    node?: Partial<
      AssociationAutocompleteUser['node'] & {
        webResource: { __typename: string }
      }
    >
  })[]
}) => ({
  request: {
    query: GET_ASSOCIATION_USER_AUTOCOMPLETE,
    variables: { term, limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE }
  },
  result: {
    data: {
      autocomplete: {
        edges: results.map(edge => ({
          key: edge.node?.id ?? defaultEdge.node.id,
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

export const createGetAssociationUserAutocompleteFailedMock = ({
  term,
  errorMessage
}: {
  term: string
  errorMessage: string
}) => ({
  request: {
    query: GET_ASSOCIATION_USER_AUTOCOMPLETE,
    variables: { term, limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE }
  },
  error: new Error(errorMessage)
})
