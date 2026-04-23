import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResetRejectedTalentApplicationDocument,
  ResetRejectedTalentApplicationMutation
} from './reset-rejected-talent-application.staff.gql.types'

export const RESET_REJECTED_TALENT_APPLICATION: typeof ResetRejectedTalentApplicationDocument = gql`
  mutation ResetRejectedTalentApplication(
    $input: ResetRejectedTalentApplicationInput!
  ) {
    resetRejectedTalentApplication(input: $input) {
      ...MutationResultFragment
      emailTemplate {
        id
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResetRejectedApplication = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ResetRejectedTalentApplicationMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RESET_REJECTED_TALENT_APPLICATION, {
    onCompleted,
    onError
  })
