import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetCallPurposeValuesDocument,
  GetCallPurposeValuesQueryVariables
} from './get-call-purpose-values.staff.gql.types'

export const GET_CALL_PURPOSE_VALUES: typeof GetCallPurposeValuesDocument = gql`
  query GetCallPurposeValues($callId: ID!) {
    call(id: $callId) {
      ... on Call {
        purpose
        id
      }
    }
  }
`

export const getCallValuesHook =
  (variables: GetCallPurposeValuesQueryVariables) => () => {
    const [request, { data, error, ...restOptions }] = useLazyQuery(
      GET_CALL_PURPOSE_VALUES,
      {
        variables,
        throwOnError: true
      }
    )

    return {
      request,
      throwOnError: true,
      data: data?.call?.purpose,
      error,
      ...restOptions
    }
  }
