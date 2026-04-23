import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateJobTalentCount($input: UpdateJobTalentCountInput!) {
    updateJobTalentCount(input: $input) {
      job {
        id
        talentCount
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
