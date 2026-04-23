import { CLIENT_FRAGMENT } from '@staff-portal/clients'
import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientsList(
    $pagination: OffsetPagination!
    $order: ClientSearchOrder
    $filter: ClientFilter!
    $isClientsList: Boolean!
  ) {
    clients(pagination: $pagination, filter: $filter, order: $order) {
      nodes {
        ...ClientFragment
      }
      totalCount
    }
  }

  ${CLIENT_FRAGMENT}
`
