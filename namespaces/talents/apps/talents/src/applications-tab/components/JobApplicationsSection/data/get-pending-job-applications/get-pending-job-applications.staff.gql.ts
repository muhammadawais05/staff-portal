import { gql, useQuery, isNetworkLoading, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetPendingJobApplicationsDocument } from './get-pending-job-applications.staff.gql.types'
import { APPLICATION_TAB_BATCH_KEY } from '../../../../config'
import { JOB_APPLICATION_FRAGMENT } from '../../../../data/job-application-fragment'

export const GET_PENDING_JOB_APPLICATIONS: typeof GetPendingJobApplicationsDocument = gql`
  query GetPendingJobApplications($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        talentType
        jobApplications(
          filter: { statuses: [PENDING] }
          pagination: { limit: 10000, offset: 0 }
        ) {
          nodes {
            ...jobApplicationFragment
          }
        }
        allJobApplications: jobApplications(
          pagination: { limit: 10000, offset: 0 }
        ) {
          totalCount
        }
      }
    }
  }

  ${JOB_APPLICATION_FRAGMENT}
`

export const useGetPendingJobApplications = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_PENDING_JOB_APPLICATIONS,
    {
      throwOnError: true,
      variables: { talentId },
      context: { [BATCH_KEY]: APPLICATION_TAB_BATCH_KEY }
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
