import {
  CallbackRequestOrderField,
  OrderDirection
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetCallRequestsListQueryVariables } from './get-call-requests-list.staff.gql.types'
import { GET_CALL_REQUESTS_LIST } from './get-call-requests-list.staff.gql'

export const GET_CALL_REQUESTS_LIST_DEFAULT_VARIABLES: GetCallRequestsListQueryVariables =
  {
    filter: {},
    order: {
      field: CallbackRequestOrderField.REQUESTED_START_TIME,
      direction: OrderDirection.ASC
    },
    pagination: {
      offset: 0,
      limit: 10
    }
  }

export const createGetCallRequestsListFailedMock = (
  variables: GetCallRequestsListQueryVariables,
  errorMessage: string
): MockedResponse => ({
  request: { query: GET_CALL_REQUESTS_LIST, variables },
  error: new Error(errorMessage)
})
