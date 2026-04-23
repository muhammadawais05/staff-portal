import {
  BATCH,
  filterUnauthorizedErrors,
  gql,
  useQuery
} from '@staff-portal/data-layer-service'

import { GetCompanyTabsInfoDocument } from './get-company-tabs-info.staff.gql.types'

export default gql`
  query GetCompanyTabsInfo($clientId: ID!) {
    viewer {
      permits {
        canViewJob
      }
    }
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        jobs(filter: { scope: NON_DRAFT }) {
          totalCount
        }
        representatives {
          totalCount
        }
        topscreenClient {
          id
        }
        __typename
      }
    }
  }
`

export const useGetCompanyTabsInfo = (clientId: string) => {
  const { data, refetch, ...restOptions } = useQuery(
    GetCompanyTabsInfoDocument,
    {
      variables: { clientId },
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors],
      context: { [BATCH]: false }
    }
  )

  return {
    ...restOptions,
    companyTabsInfo: data?.node,
    userPermissions: data?.viewer.permits,
    refetch
  }
}
