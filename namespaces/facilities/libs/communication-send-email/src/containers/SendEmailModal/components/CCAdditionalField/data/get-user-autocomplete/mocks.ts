import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  AutocompleteClientFragment,
  AutocompleteRoleFragment
} from './get-user-autocomplete.staff.gql.types'
import { GET_USER_AUTOCOMPLETE } from './get-user-autocomplete.staff.gql'

export const createGetUserAutocompleteMock = ({
  term,
  model,
  nodes
}: {
  term: string
  model: AutocompleteModels
  nodes: Partial<AutocompleteClientFragment | AutocompleteRoleFragment>[]
}) => ({
  request: {
    query: GET_USER_AUTOCOMPLETE,
    variables: {
      filter: { model, term },
      pagination: { limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE, offset: 0 }
    }
  },
  result: {
    data: {
      autocomplete: {
        nodes: nodes.map((user, index) => ({
          fullName: 'Test Name',
          id: encodeEntityId('123' + index, 'Test'),
          userLegacyId: 269483,
          email: 'laur-3825cc031b8583b3@toptal.io',
          contacts: { nodes: [], __typename: 'ContactConnection' },
          photo: null,
          type: '',
          __typename: 'Staff',
          ...user
        })),
        totalCount: nodes.length,
        __typename: 'NodeConnection'
      },
      __typename: 'Query'
    }
  }
})

export const createGetUserAutocompleteFailedMock = ({
  term,
  model,
  errorMessage
}: {
  term: string
  model: AutocompleteModels
  errorMessage: string
}) => ({
  request: {
    query: GET_USER_AUTOCOMPLETE,
    variables: {
      filter: { model, term },
      pagination: { limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE, offset: 0 }
    }
  },
  error: new Error(errorMessage)
})
