import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ReactivateTalentDocument } from './reactivate-talent.staff.gql.types'

export const REACTIVATE_TALENT: typeof ReactivateTalentDocument = gql`
  mutation ReactivateTalent($input: ReactivateTalentInput!) {
    reactivateTalent(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
