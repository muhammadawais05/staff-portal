import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetDeleteJobDetailsDocument } from './get-delete-job-details.staff.gql.types'
import { RELATED_MEETINGS_FRAGMENT } from '../related-meetings-fragment/related-meetings-fragment.staff.gql'

export const GET_DELETE_JOB_DETAILS: typeof GetDeleteJobDetailsDocument = gql`
  query GetDeleteJobDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        cumulativeStatus
        client {
          id
          depositInvoices {
            nodes {
              id
              job {
                id
              }
            }
          }
        }
        operations {
          refundJobDeposit {
            callable
          }
        }
        ...RelatedMeetingsFragment
      }
    }
  }

  ${RELATED_MEETINGS_FRAGMENT}
`

export const useGetDeleteJobDetails = (jobId: string) => {
  const { data, ...restOptions } = useQuery(GET_DELETE_JOB_DETAILS, {
    throwOnError: true,
    variables: { jobId }
  })

  return {
    job: data?.node,
    ...restOptions
  }
}
