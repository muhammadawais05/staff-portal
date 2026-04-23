import { useMemo, useCallback } from 'react'
import { useLocation, queryStringToObject } from '@staff-portal/navigation'
import {
  DateRange,
  CallbackRequestOrder,
  CallbackRequestOrderField,
  OrderDirection
} from '@staff-portal/graphql/staff'
import {
  gql,
  useLazyQuery,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { Sort } from '@staff-portal/filters'
import { CALL_REQUEST_FRAGMENT } from '@staff-portal/clients-call-requests'

import {
  GetCallRequestsListDocument,
  GetCallRequestsListQuery
} from './get-call-requests-list.staff.gql.types'

export const GET_CALL_REQUESTS_LIST = gql`
  query GetCallRequestsList(
    $filter: CallbackFilter!
    $pagination: OffsetPagination!
    $order: CallbackRequestOrder
  ) {
    callbackRequests(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        ...CallRequestFragment
      }
      __typename
      totalCount
    }
    __typename
  }
  ${CALL_REQUEST_FRAGMENT}
`

const getQueryResponse = (
  data: GetCallRequestsListQuery | undefined,
  lastFetchedData: GetCallRequestsListQuery | undefined,
  loading: boolean
) => {
  const lastFetchedResponse =
    (loading && lastFetchedData?.callbackRequests) || undefined

  return data?.callbackRequests || lastFetchedResponse
}

const getOrder = (
  sort: Sort | undefined,
  defaultOrder: CallbackRequestOrder
): CallbackRequestOrder => {
  if (!sort) {
    return defaultOrder
  }

  return {
    field: sort.target.toUpperCase() as CallbackRequestOrderField,
    direction: sort.order.toUpperCase() as OrderDirection
  }
}

type FilterValues = {
  claimer_id?: string
  statuses?: string[]
  call_purpose?: string[]
  call_type?: string[]
  late?: string
  created_at?: DateRange
  call_claimed_at?: DateRange
  page?: string
  sort?: Record<string, string>
}

export const useGetCallRequestsList = ({
  pagination
}: {
  pagination: { offset: number; limit: number }
}) => {
  const location = useLocation()

  const [callRequest, { data, loading, error }] = useLazyQuery(
    GetCallRequestsListDocument
  )

  const [filterValues, lastFetchedData] = useMemo(() => {
    return [queryStringToObject(location.search) as FilterValues, data]

    // The autofix changes the line below to [location.search, data]. The idea is to replace the data with
    // the last available request data while loading is true, otherwise, the data is "undefined"
    // which causes the list of items to be empty, so the list flickers: [a, b, c] > No items > [d, e, f],
    // so the point is to have [a, b, c] > [a, b, c] with loading overlay > [d, e, f].
    // This is needed only on first load of the specific filter values, as afterwards last available request data
    // will be pulled out of the cache thanks to the "cache-and-network" fetch policy.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const mapClaimer = (filterClaimer?: string) => {
    if (filterClaimer === 'me' || filterClaimer === 'none') {
      return filterClaimer.toUpperCase()
    }

    return filterClaimer && encodeEntityId(filterClaimer, 'Staff')
  }

  const fetchData = useCallback(() => {
    callRequest({
      variables: {
        filter: {
          claimer: mapClaimer(filterValues.claimer_id),
          statuses: filterValues.statuses,
          callPurpose: filterValues.call_purpose,
          callType: filterValues.call_type,
          late: filterValues.late && JSON.parse(filterValues.late),
          createdAt: filterValues.created_at,
          claimedAt: filterValues.call_claimed_at
        },
        pagination,
        order: getOrder(filterValues.sort as Sort | undefined, {
          field: CallbackRequestOrderField.REQUESTED_START_TIME,
          direction: OrderDirection.ASC
        })
      }
    })
  }, [filterValues, pagination, callRequest])

  const response = getQueryResponse(data, lastFetchedData, loading)

  return {
    fetchData,
    callRequests: response?.nodes,
    totalCount: response?.totalCount,
    loading,
    error
  }
}
