import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const LINK_REPRESENTATIVE_OPPORTUNITY = gql`
  mutation LinkRepresentativeOpportunity(
    $input: LinkOpportunityCompanyRepresentativeInput!
  ) {
    linkOpportunityCompanyRepresentative(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
