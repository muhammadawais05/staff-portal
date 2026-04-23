import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ROLE_STEP_NEXT_ACTION_FRAGMENT } from '../../../../data'

export default gql`
  mutation ApproveEnglishStep($input: ApproveEnglishRoleStepInput!) {
    approveEnglishRoleStep(input: $input) {
      ...MutationResultFragment
      ...RoleStepNextActionFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${ROLE_STEP_NEXT_ACTION_FRAGMENT}
`
