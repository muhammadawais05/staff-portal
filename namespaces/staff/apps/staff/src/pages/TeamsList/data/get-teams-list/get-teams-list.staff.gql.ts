import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  fragment TeamListItemFragment on Team {
    id
    name
    manager {
      id
      role {
        fullName
        webResource {
          url
        }
      }
    }
    coreTeam
    roles(order: { field: FULL_NAME, direction: ASC }) {
      totalCount
      nodes {
        ... on Staff {
          id
          fullName
          ...WebResourceFragment
        }
      }
    }
    ...WebResourceFragment
  }

  query GetTeamsList(
    $pagination: OffsetPagination!
    $order: TeamsOrder
    $filter: TeamsFilter!
  ) {
    teams(pagination: $pagination, order: $order, filter: $filter) {
      totalCount
      nodes {
        id
        ...TeamListItemFragment
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`
