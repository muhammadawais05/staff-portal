import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const RESUME_SENDING_JOB_AWAY = gql`
  mutation ResumeSendingJobAway($jobId: ID!) {
    resumeSendingJobAway(input: { jobId: $jobId }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
