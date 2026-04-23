import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UnclaimScreeningStepDocument,
  UnclaimScreeningStepMutation
} from './unclaim-screening-step.staff.gql.types'

export const UNCLAIM_SCREENING_STEP: typeof UnclaimScreeningStepDocument = gql`
  mutation UnclaimScreeningStep($roleStepId: ID!, $comment: String!) {
    unclaimRoleStep(input: { roleStepId: $roleStepId, comment: $comment }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUnclaimScreeningStep = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UnclaimScreeningStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(UNCLAIM_SCREENING_STEP, {
    onCompleted,
    onError
  })
