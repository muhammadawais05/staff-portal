import { gql, useQuery } from '@staff-portal/data-layer-service'

import { CALLS_LIST_ITEM_FRAGMENT } from './calls-list-item-fragment.staff.gql'
import {
  GetCallsListDocument,
  GetCallsListQueryVariables
} from './get-calls-list.staff.gql.types'

export const GET_CALLS_LIST = gql`
  query GetCallsList(
    $pagination: OffsetPagination!
    $order: OrderDirection
    $isUnfilled: Boolean
  ) {
    viewer {
      calls(pagination: $pagination, order: $order, isUnfilled: $isUnfilled) {
        totalCount
        nodes {
          ...CallsListItemFragment
        }
      }
    }
  }
  ${CALLS_LIST_ITEM_FRAGMENT}
`

export const useGetCallsList = (
  variables: GetCallsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, ...restOptions } = useQuery(GetCallsListDocument, {
    variables,
    throwOnError: true,
    skip
  })

  return { data, error, ...restOptions }
}
