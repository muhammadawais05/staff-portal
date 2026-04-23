import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SendEngagementPaymentsAgreement(
    $input: SendSemiMonthlyEngagementPaymentsAgreementInput!
  ) {
    sendSemiMonthlyEngagementPaymentsAgreement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
