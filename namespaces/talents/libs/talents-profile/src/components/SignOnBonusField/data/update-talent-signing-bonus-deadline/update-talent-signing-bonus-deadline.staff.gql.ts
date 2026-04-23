import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateTalentSigningBonusDeadline(
    $input: UpdateTalentSigningBonusDeadlineInput!
  ) {
    updateTalentSigningBonusDeadline(input: $input) {
      ...MutationResultFragment
      talent {
        id
        signingBonusExpiresAt
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
