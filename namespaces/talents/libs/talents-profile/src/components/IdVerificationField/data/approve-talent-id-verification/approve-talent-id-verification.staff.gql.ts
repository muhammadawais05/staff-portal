import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ApproveTalentIdVerificationDocument,
  ApproveTalentIdVerificationMutation
} from './approve-talent-id-verification.staff.gql.types'

export const APPROVE_TALENT_ID_VERIFICATION: typeof ApproveTalentIdVerificationDocument = gql`
  mutation ApproveTalentIdVerification(
    $input: ApproveTalentIdVerificationInput!
  ) {
    approveTalentIdVerification(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveTalentIdVerification = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: ApproveTalentIdVerificationMutation) => void
}) =>
  useMutation(APPROVE_TALENT_ID_VERIFICATION, {
    onError,
    onCompleted
  })
