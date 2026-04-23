import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_PARENT_FRAGMENT } from './company-parent-fragment.staff.gql'

export default gql`
  mutation SetUpdateClientParentLink($input: UpdateClientParentInput!) {
    updateClientParent(input: $input) {
      client {
        id
        ...CompanyParentFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${COMPANY_PARENT_FRAGMENT}
`
