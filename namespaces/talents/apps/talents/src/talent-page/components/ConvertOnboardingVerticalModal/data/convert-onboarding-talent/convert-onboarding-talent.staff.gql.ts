import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { TALENT_VERTICAL_FRAGMENT } from '@staff-portal/talents'

import {
  ConvertOnboardingTalentDocument,
  ConvertOnboardingTalentMutation
} from './convert-onboarding-talent.staff.gql.types'

export const CONVERT_ONBOARDING_TALENT: typeof ConvertOnboardingTalentDocument = gql`
  mutation ConvertOnboardingTalent($input: ConvertOnboardingTalentInput!) {
    convertOnboardingTalent(input: $input) {
      ...MutationResultFragment
      talent {
        id
        type
        otherVerticals {
          nodes {
            ...TalentVerticalFragment
          }
        }
      }
    }
  }

  ${TALENT_VERTICAL_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useConvertOnboardingTalent = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted: (data: ConvertOnboardingTalentMutation) => void
}) =>
  useMutation(CONVERT_ONBOARDING_TALENT, {
    onError,
    onCompleted
  })
