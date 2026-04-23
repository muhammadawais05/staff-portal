import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetResolveClientFeedbackInvestigation(
    $input: ResolveClientClientFeedbackInvestigationInput!
  ) {
    resolveClientClientFeedbackInvestigation(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
