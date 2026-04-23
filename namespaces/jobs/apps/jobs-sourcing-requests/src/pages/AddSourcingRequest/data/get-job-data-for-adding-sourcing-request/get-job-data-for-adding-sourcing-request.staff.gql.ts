import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetJobDataForAddingSourcingRequestDocument } from './get-job-data-for-adding-sourcing-request.staff.gql.types'
import { SOURCING_REQUEST_JOB_FRAGMENT } from '../../../../data/sourcing-request-job-fragment/sourcing-request-job-fragment.staff.gql'

export const GET_JOB_DATA_FOR_ADDING_SOURCING_REQUEST = gql`
  query GetJobDataForAddingSourcingRequest($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...SourcingRequestJobFragment
        operations {
          createSourcingRequest {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${SOURCING_REQUEST_JOB_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

export const useGetJobDataForAddingSourcingRequest = (jobId: string) =>
  useGetNode(GetJobDataForAddingSourcingRequestDocument)(
    { jobId },
    { throwOnError: true }
  )
