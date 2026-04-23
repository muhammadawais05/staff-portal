import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { PauseTalentDocument } from './pause-talent.staff.gql.types'

export const PAUSE_TALENT: typeof PauseTalentDocument = gql`
  mutation PauseTalent($input: PauseTalentInput!) {
    pauseTalent(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
