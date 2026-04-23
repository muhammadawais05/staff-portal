import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResumePostponedJobDocument,
  ResumePostponedJobMutation
} from './resume-postponed-job.staff.gql.types'

export const RESUME_POSTPONED_JOB: typeof ResumePostponedJobDocument = gql`
  mutation ResumePostponedJob($jobId: ID!) {
    resumePostponedJob(input: { jobId: $jobId }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResumePostponedJob = ({
  jobId,
  onCompleted,
  onError
}: {
  jobId: string
  onCompleted?: (data: ResumePostponedJobMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RESUME_POSTPONED_JOB, {
    variables: {
      jobId
    },
    onCompleted,
    onError
  })
