import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateTalentSoftSkillRatingDocument,
  CreateTalentSoftSkillRatingMutation
} from './create-talent-soft-skill-rating.staff.gql.types'

export default gql`
  mutation CreateTalentSoftSkillRating(
    $input: CreateTalentSoftSkillRatingInput!
  ) {
    createTalentSoftSkillRating(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTalentSoftSkillRating = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: CreateTalentSoftSkillRatingMutation) => void
}) =>
  useMutation(CreateTalentSoftSkillRatingDocument, {
    onError,
    onCompleted
  })
