import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_OVERVIEW_FRAGMENT } from './company-overview-fragment.staff.gql'

export default gql`
  mutation SetUpdateCountAsLead($input: UpdateClientCountAsLeadInput!) {
    updateClientCountAsLead(input: $input) {
      client {
        ...CompanyOverviewFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${COMPANY_OVERVIEW_FRAGMENT}
`
