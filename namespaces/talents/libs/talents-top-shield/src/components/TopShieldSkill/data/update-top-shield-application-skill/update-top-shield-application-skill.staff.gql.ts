import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_TOP_SHIELD_APPLICATION_SKILL = gql`
  mutation UpdateTopShieldApplicationSkill(
    $input: UpdateTopShieldApplicationSkillInput!
  ) {
    updateTopShieldApplicationSkill(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        skill
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
