import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetRateChangeRequestListDocument,
  GetRateChangeRequestListQueryVariables
} from './get-rate-change-request-list.staff.gql.types'
import { RATE_CHANGE_REQUEST_FRAGMENT } from '../rate-change-request-fragment'

export const GET_RATE_CHANGE_REQUEST_LIST = gql`
  query GetRateChangeRequestList(
    $order: RateChangeRequestOrder!
    $pagination: OffsetPagination!
    $filter: RateChangeRequestFilter
  ) {
    rateChangeRequests(
      order: $order
      pagination: $pagination
      filter: $filter
    ) {
      nodes {
        ...RateChangeRequestFragment
      }
      totalCount
    }
  }

  ${RATE_CHANGE_REQUEST_FRAGMENT}
`

export const useGetRateChangeRequestList = (
  variables: GetRateChangeRequestListQueryVariables,
  skip?: boolean
) => {
  const { data, error, loading, ...rest } = useQuery(
    GetRateChangeRequestListDocument,
    { variables, skip, throwOnError: true }
  )

  const rateChangeRequestsData = useMemo(() => {
    if (!data?.rateChangeRequests) {
      return
    }

    const { nodes, totalCount } = data.rateChangeRequests

    return { rateChangeRequests: nodes, totalCount }
  }, [data])

  return {
    data: rateChangeRequestsData,
    loading,
    error,
    ...rest
  }
}
