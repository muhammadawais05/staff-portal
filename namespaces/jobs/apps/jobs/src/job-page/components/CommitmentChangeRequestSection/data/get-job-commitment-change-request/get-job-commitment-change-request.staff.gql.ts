import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetJobCommitmentChangeRequestDocument } from './get-job-commitment-change-request.staff.gql.types'

export default gql`
  query GetJobCommitmentChangeRequest($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        title

        pendingCommitmentChangeRequest {
          ...CommitmentChangeRequestFragment
        }

        client {
          id
        }
      }
    }
  }

  fragment CommitmentChangeRequestFragment on CommitmentChangeRequest {
    id
    changeDate
    createdAt
    newAvailability
    newExtraHoursEnabled
    operations {
      approveCommitmentChangeRequest {
        ...OperationFragment
      }
      rejectCommitmentChangeRequest {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`

export const useGetJobCommitmentChangeRequest = (jobId: string) => {
  const { data, loading, ...restOptions } = useGetNode(
    GetJobCommitmentChangeRequestDocument
  )({ jobId }, { throwOnError: true })

  return {
    data,
    loading,
    ...restOptions
  }
}
