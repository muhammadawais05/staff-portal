import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ClearJobFavoriteTalentsDocument } from './clear-job-favorite-talents.staff.gql.types'
import { JOB_FAVORITE_TALENTS_FRAGMENT } from './job-favorite-talents-fragment.staff.gql'

export const CLEAR_JOB_FAVORITE_TALENTS: typeof ClearJobFavoriteTalentsDocument = gql`
  mutation ClearJobFavoriteTalents($jobId: ID!) {
    clearJobFavorites(input: { jobId: $jobId }) {
      ...MutationResultFragment
      job {
        id
        ...JobFavoriteTalentsFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${JOB_FAVORITE_TALENTS_FRAGMENT}
`

export const useClearJobFavoriteTalents = ({
  onCompleted,
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) =>
  useMutation(CLEAR_JOB_FAVORITE_TALENTS, {
    onCompleted,
    onError
  })
