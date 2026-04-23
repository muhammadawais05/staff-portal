import {
  gql,
  useQuery,
  filterUnauthorizedErrors,
  BATCH
} from '@staff-portal/data-layer-service'

import { GetJobPageTabsPermissionsDocument } from './get-job-page-tabs-permissions.staff.gql.types'

export const GET_JOB_PAGE_TABS_PERMISSIONS = gql`
  query GetJobPageTabsPermissions($jobId: ID!) {
    viewer {
      permits {
        canViewBillingCycle
      }
    }
    node(id: $jobId) {
      ... on Job {
        id
        status
        sourcingRequest {
          id
        }
      }
    }
  }
`

export const useGetJobPageTabsPermissions = (jobId: string) => {
  const { data, ...restOptions } = useQuery(GetJobPageTabsPermissionsDocument, {
    variables: { jobId },
    throwOnError: true,
    errorFilters: [filterUnauthorizedErrors],
    // Batching needs to stay disabled
    // in order to redirect ASAP on Job Summary tab
    context: { [BATCH]: false }
  })

  return {
    ...restOptions,
    tabsPermissions: data?.node,
    userPermissions: data?.viewer.permits
  }
}
