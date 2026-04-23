import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RemoveSoftSkillRatingDocument,
  RemoveSoftSkillRatingMutation
} from './remove-soft-skill-rating.staff.gql.types'

export default gql`
  mutation RemoveSoftSkillRating($input: RemoveSoftSkillRatingInput!) {
    removeSoftSkillRating(input: $input) {
      softSkillRating {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveSoftSkillRating = ({
  onCompleted
}: {
  onCompleted?: (data: RemoveSoftSkillRatingMutation) => void
}) => {
  const [removeSoftSkillRating] = useMutation(RemoveSoftSkillRatingDocument, {
    onCompleted
  })

  return {
    removeSoftSkillRating: (ratingId: string) =>
      removeSoftSkillRating({
        variables: {
          input: {
            softSkillRatingId: ratingId
          }
        }
      })
  }
}
