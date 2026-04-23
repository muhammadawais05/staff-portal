import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RemoveJobDocument,
  RemoveJobMutation
} from './remove-job.staff.gql.types'

export const REMOVE_JOB: typeof RemoveJobDocument = gql`
  mutation RemoveJob(
    $jobId: ID!
    $reasonId: ID
    $comment: String
    $notifyClient: Boolean
    $refundDeposit: Boolean
    $clientHiredElsewhere: JobClientHiredElsewhere
    $clientHiredInternallyOrExternally: JobClientHiredInternallyOrExternally
    $whereClientHired: String
  ) {
    removeJob(
      input: {
        jobId: $jobId
        reasonId: $reasonId
        comment: $comment
        notifyClient: $notifyClient
        refundDeposit: $refundDeposit
        clientHiredElsewhere: $clientHiredElsewhere
        clientHiredInternallyOrExternally: $clientHiredInternallyOrExternally
        whereClientHired: $whereClientHired
      }
    ) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveJob = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RemoveJobMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(REMOVE_JOB, {
    onCompleted,
    onError
  })
