import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import {
  COMPANY_CURRENT_INVESTIGATION_FRAGMENT,
  INTERNAL_TEAM_MATCHER_FRAGMENT
} from '@staff-portal/clients'

import {
  GetClientsNamesAndTotalCountDocument,
  GetClientsNamesAndTotalCountQueryVariables
} from './get-clients-names-and-total-count.staff.gql.types'

export const GET_CLIENTS_NAMES_AND_TOTAL_COUNT = gql`
  query GetClientsNamesAndTotalCount(
    $pagination: OffsetPagination!
    $order: ClientSearchOrder
    $filter: ClientFilter!
  ) {
    clients(pagination: $pagination, filter: $filter, order: $order) {
      nodes {
        ...TasksByClientClientFragment
      }
      totalCount
    }
    viewer {
      permits {
        canSeeCompanyTasks
      }
    }
  }

  fragment TasksByClientClientFragment on Client {
    id
    fullName
    cumulativeStatus
    contact {
      id
      fullName
    }
    claimer {
      id
      fullName
      ...WebResourceFragment
    }
    matchers {
      edges {
        ...InternalTeamMatcherFragment
      }
    }
    mainSkillsNeeded(order: { field: NAME, direction: ASC }) {
      nodes {
        id
        name
      }
    }
    ...CompanyCurrentInvestigation
    ...WebResourceFragment
  }

  ${COMPANY_CURRENT_INVESTIGATION_FRAGMENT}
  ${INTERNAL_TEAM_MATCHER_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`

export const useGetClientsNamesAndTotalCount = (
  variables: GetClientsNamesAndTotalCountQueryVariables,
  skip?: boolean
) => {
  const { data, ...rest } = useQuery(GetClientsNamesAndTotalCountDocument, {
    variables,
    skip,
    throwOnError: true
  })

  return {
    ...rest,
    totalCount: data?.clients?.totalCount,
    clients: data?.clients?.nodes,
    canSeeCompanyTasks: data?.viewer?.permits?.canSeeCompanyTasks
  }
}
