import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreOnboardingTalentDocument,
  RestoreOnboardingTalentMutation
} from './restore-onboarding-talent.staff.gql.types'

export const RESTORE_ONBOARDING_TALENT: typeof RestoreOnboardingTalentDocument = gql`
  mutation RestoreOnboardingTalent($input: RestoreOnboardingTalentInput!) {
    restoreOnboardingTalent(input: $input) {
      ...MutationResultFragment

      emailTemplate {
        id
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreOnboardingTalent = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RestoreOnboardingTalentMutation) => void
  onError?: (error: Error) => void
} = {}) => useMutation(RESTORE_ONBOARDING_TALENT, { onCompleted, onError })
