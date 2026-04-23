import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetResolveClientLegalInvestigation(
    $input: ResolveClientLegalInvestigationInput!
  ) {
    resolveClientLegalInvestigation(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
