import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { FIRST_TASK_CARD_BATCH_KEY } from '@staff-portal/tasks'

import { GetJobDocument } from './get-job.staff.gql.types'
import { JOB_FRAGMENT } from '../job-fragment/job-fragment.staff.gql'

export const GET_JOB: typeof GetJobDocument = gql`
  query GetJob($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...JobFragment
        ...JobTaskCardOperationsFragment
      }
    }
  }

  fragment JobTaskCardOperationsFragment on Job {
    operations {
      approveJob {
        ...OperationFragment
      }
      removeJob {
        ...OperationFragment
      }
      resumePostponedJob {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${JOB_FRAGMENT}
`

export const useGetJob = (jobId: string) => {
  const { data, ...restOptions } = useQuery(GET_JOB, {
    throwOnError: true,
    variables: { jobId },
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
