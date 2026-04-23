import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveTalentFromJobFavoritesDocument } from './remove-talent-from-job-favorites.staff.gql.types'
import { JOB_CANDIDATE_OPERATIONS_FRAGMENT } from '../job-candidate-operations-fragment'

export const REMOVE_TALENT_FROM_JOB_FAVORITES: typeof RemoveTalentFromJobFavoritesDocument = gql`
  mutation RemoveTalentFromJobFavorites($jobId: ID!, $talentId: ID!) {
    removeTalentFromJobFavorites(
      input: { jobId: $jobId, talentId: $talentId }
    ) {
      ...MutationResultFragment
      talent {
        id
        operations {
          ...JobCandidateOperationsFragment
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${JOB_CANDIDATE_OPERATIONS_FRAGMENT}
`

export const useRemoveTalentFromJobFavorites = ({
  onCompleted,
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) =>
  useMutation(REMOVE_TALENT_FROM_JOB_FAVORITES, {
    onCompleted,
    onError
  })
