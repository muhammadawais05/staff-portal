import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetResolveClientCcAchDisputeInvestigation(
    $input: ResolveClientCcAchDisputeInvestigationInput!
  ) {
    resolveClientCcAchDisputeInvestigation(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
