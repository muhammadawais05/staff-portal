import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_NEGOTIATION_FRAGMENT } from '../../../../basic-info-tab/components/LinkedCompaniesSection/data/company-negotiation-fragment.staff.gql'

export default gql`
  mutation ImportSTA($input: ImportSTAInput!) {
    importSTA(input: $input) {
      client {
        ...CompanyNegotiationFragment
        operations {
          startNegotiationForClient {
            ...OperationFragment
          }
          importSTA {
            ...OperationFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${COMPANY_NEGOTIATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
