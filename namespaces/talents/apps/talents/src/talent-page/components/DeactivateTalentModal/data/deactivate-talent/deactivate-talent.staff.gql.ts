import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  DeactivateTalentDocument,
  DeactivateTalentMutation
} from './deactivate-talent.staff.gql.types'

export const DEACTIVATE_TALENT: typeof DeactivateTalentDocument = gql`
  mutation DeactivateTalent($talentId: ID!, $comment: String!) {
    removeTalent(input: { talentId: $talentId, comment: $comment }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDeactivateTalent = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: DeactivateTalentMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(DEACTIVATE_TALENT, {
    onCompleted,
    onError
  })
