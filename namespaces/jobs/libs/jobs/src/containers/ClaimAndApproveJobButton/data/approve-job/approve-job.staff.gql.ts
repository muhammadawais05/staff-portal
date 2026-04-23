import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ApproveJobDocument,
  ApproveJobMutation
} from './approve-job.staff.gql.types'

export const APPROVE_JOB: typeof ApproveJobDocument = gql`
  mutation ApproveJob($input: ApproveJobInput!) {
    approveJob(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveJob = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ApproveJobMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(APPROVE_JOB, {
    onCompleted,
    onError,
    ignoreResults: true
  })
