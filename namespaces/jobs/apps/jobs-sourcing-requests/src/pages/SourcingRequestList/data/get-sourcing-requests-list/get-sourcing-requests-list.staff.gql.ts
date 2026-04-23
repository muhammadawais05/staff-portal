import { gql, useGetData } from '@staff-portal/data-layer-service'

import { SOURCING_REQUESTS_LIST_ITEM_FRAGMENT } from '../../../../data/sourcing-requests-list-item-fragment/sourcing-requests-list-item-fragment.staff.gql'
import {
  GetSourcingRequestsListDocument,
  GetSourcingRequestsListQueryVariables
} from './get-sourcing-requests-list.staff.gql.types'

export default gql`
  query GetSourcingRequestsList(
    $pagination: OffsetPagination!
    $order: SourcingRequestOrder
    $filter: SourcingRequestFilter
  ) {
    sourcingRequests(pagination: $pagination, order: $order, filter: $filter) {
      totalCount
      nodes {
        id
        ...SourcingRequestsListItemFragment
      }
    }
  }

  ${SOURCING_REQUESTS_LIST_ITEM_FRAGMENT}
`

export const useGetSourcingRequestsList = (
  variables?: GetSourcingRequestsListQueryVariables,
  skip?: boolean
) => {
  return useGetData(GetSourcingRequestsListDocument, 'sourcingRequests')(
    variables,
    {
      skip,
      throwOnError: true
    }
  )
}
