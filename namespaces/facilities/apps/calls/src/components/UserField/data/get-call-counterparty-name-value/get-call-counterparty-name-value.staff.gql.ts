import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetCallCounterpartyNameValuesDocument,
  GetCallCounterpartyNameValuesQueryVariables
} from './get-call-counterparty-name-value.staff.gql.types'

export const GET_CALL_COUNTER_PARTY_VALUE: typeof GetCallCounterpartyNameValuesDocument = gql`
  query GetCallCounterpartyNameValues($callId: ID!) {
    call(id: $callId) {
      ... on Call {
        counterparty {
          fullName
        }
        id
      }
    }
  }
`

export const useGetCallCounterpartyNameValue = (
  variables: GetCallCounterpartyNameValuesQueryVariables
) => {
  const [request, { data, error, ...restOptions }] = useLazyQuery(
    GET_CALL_COUNTER_PARTY_VALUE,
    {
      variables,
      throwOnError: true
    }
  )

  return () => ({
    request,
    throwOnError: true,
    data: data?.call?.counterparty?.fullName,
    error,
    ...restOptions
  })
}
