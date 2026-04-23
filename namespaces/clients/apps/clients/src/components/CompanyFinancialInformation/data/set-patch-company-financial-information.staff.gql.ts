import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_FINANCIAL_INFORMATION_FRAGMENT } from './company-financial-information-fragment.staff.gql'

export default gql`
  mutation SetPatchCompanyFinancialInformation(
    $input: PatchClientProfileInput!
  ) {
    patchClientProfile(input: $input) {
      client {
        ...CompanyFinancialInformationFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${COMPANY_FINANCIAL_INFORMATION_FRAGMENT}
`
