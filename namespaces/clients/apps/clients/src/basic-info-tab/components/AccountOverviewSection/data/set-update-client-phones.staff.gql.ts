import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

import { COMPANY_CONTACTS_FRAGMENT } from './company-contacts-fragment.staff.gql'

export default gql`
  mutation SetUpdateCompanyRepresentativePhoneNumbers(
    $input: UpdateCompanyRepresentativePhoneNumbersInput!
  ) {
    updateCompanyRepresentativePhoneNumbers(input: $input) {
      companyRepresentative {
        client {
          id
          contact {
            ...RoleOrClientFragment
            ...CompanyContactsFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${COMPANY_CONTACTS_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
