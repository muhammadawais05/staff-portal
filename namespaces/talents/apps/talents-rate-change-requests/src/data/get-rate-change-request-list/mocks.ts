import {
  OrderDirection,
  RateChangeRequestOrderField
} from '@staff-portal/graphql/staff'

import { createRateChangeRequestMock } from '../rate-change-request-fragment/mocks'
import {
  GetRateChangeRequestListDocument,
  GetRateChangeRequestListQueryVariables
} from './get-rate-change-request-list.staff.gql.types'

const DEFAULT_VARIABLES: GetRateChangeRequestListQueryVariables = {
  filter: {},
  order: {
    field: RateChangeRequestOrderField.SUBMISSION_AT,
    direction: OrderDirection.DESC
  },
  pagination: {
    offset: 0,
    limit: 10
  }
}

export const createGetRateChangeRequestList = (
  variables = DEFAULT_VARIABLES
) => ({
  request: {
    query: GetRateChangeRequestListDocument,
    variables
  },
  result: {
    data: {
      rateChangeRequests: {
        nodes: [createRateChangeRequestMock()],
        totalCount: 1,
        __typename: 'RateChangeRequestConnection'
      },
      __typename: 'Query'
    }
  }
})

export const createEmptyGetRateChangeRequestList = (
  variables = DEFAULT_VARIABLES
) => ({
  request: {
    query: GetRateChangeRequestListDocument,
    variables
  },
  result: {
    data: {
      rateChangeRequests: {
        nodes: [],
        totalCount: 0,
        __typename: 'RateChangeRequestConnection'
      },
      __typename: 'Query'
    }
  }
})
