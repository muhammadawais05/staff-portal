import {
  filterUnauthorizedErrors,
  gql,
  useGetData
} from '@staff-portal/data-layer-service'
import {
  OffsetPagination,
  OrderDirection,
  SourcedTalentOrder,
  SourcedTalentOrderField
} from '@staff-portal/graphql/staff'

import {
  GetSourcedTalentsDocument,
  GetSourcedTalentsQueryVariables
} from './get-sourced-talents.staff.gql.types'
import { SOURCED_TALENT_FRAGMENT } from './sourced-talent-fragment.staff.gql'

export const GET_SOURCED_TALENTS = gql`
  query GetSourcedTalents(
    $order: SourcedTalentOrder!
    $pagination: OffsetPagination!
  ) {
    viewer {
      sourcedTalents(pagination: $pagination, order: $order) {
        nodes {
          ...SourcedTalentFragment
        }
        totalCount
      }
    }
  }

  ${SOURCED_TALENT_FRAGMENT}
`

export const useGetSourcedTalents = ({
  pagination,
  order = {
    field: SourcedTalentOrderField.CREATED_AT,
    direction: OrderDirection.DESC
  }
}: {
  pagination: OffsetPagination
  order?: SourcedTalentOrder
}) =>
  useGetData(GetSourcedTalentsDocument, 'viewer')(undefined, {
    variables: {
      pagination,
      order
    } as unknown as GetSourcedTalentsQueryVariables,
    throwOnError: true,
    errorFilters: [filterUnauthorizedErrors],
    fetchPolicy: 'cache-first'
  })
