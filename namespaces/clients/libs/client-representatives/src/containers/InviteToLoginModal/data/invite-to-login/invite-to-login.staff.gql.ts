import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { INVITE_TO_LOGIN_COMPANY_REPRESENTATIVE_FRAGMENT } from '../../../../data'

export default gql`
  mutation InviteToLoginCompanyRepresentative(
    $input: InviteToLoginCompanyRepresentativeInput!
  ) {
    inviteToLoginCompanyRepresentative(input: $input) {
      companyRepresentative {
        ...InviteToLoginCompanyRepresentativeFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${INVITE_TO_LOGIN_COMPANY_REPRESENTATIVE_FRAGMENT}
`
