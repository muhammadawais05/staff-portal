import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_ENTERPRISE_ACCOUNT_STATUS_FRAGMENT } from '../../../../../data/enterprise-account-status-fragment.staff.gql'

export default gql`
  mutation SetUpdateClientEnterpriseAccountStatus(
    $input: UpdateClientEnterpriseAccountStatusInput!
  ) {
    updateClientEnterpriseAccountStatus(input: $input) {
      client {
        ...CompanyEnterpriseAccountStatusFragment
      }
      ...MutationResultFragment
    }
  }

  ${COMPANY_ENTERPRISE_ACCOUNT_STATUS_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
