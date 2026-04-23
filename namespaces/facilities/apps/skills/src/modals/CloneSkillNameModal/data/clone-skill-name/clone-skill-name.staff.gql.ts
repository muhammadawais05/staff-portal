import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation CloneSkillName($input: CloneSkillNameInput!) {
    cloneSkillName(input: $input) {
      ...MutationResultFragment
      requiresMergeConfirmation
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
