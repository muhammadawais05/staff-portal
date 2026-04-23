import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { JOB_CANDIDATE_OPERATIONS_FRAGMENT } from '@staff-portal/talents'

import { AddTalentToJobFavoritesDocument } from './add-talent-to-job-favorites.staff.gql.types'

export default gql`
  mutation AddTalentToJobFavorites($jobId: ID!, $talentId: ID!) {
    addTalentToJobFavorites(input: { jobId: $jobId, talentId: $talentId }) {
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

export const useAddTalentToJobFavorites = ({
  onCompleted,
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) =>
  useMutation(AddTalentToJobFavoritesDocument, {
    onCompleted,
    onError
  })
