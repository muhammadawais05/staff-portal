import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { COMPANY_OVERVIEW_CLIENT_CONTACT_FRAGMENT } from './company-overview-client-contact-fragment.staff.gql'

export const COMPANY_CONTACTS_FRAGMENT = gql`
  fragment CompanyContactsFragment on CompanyRepresentative {
    id
    email
    contacts(filter: { type: [EMAIL, SKYPE] }) {
      nodes {
        id
        type
        value
      }
    }
    orderedPhoneNumbers {
      nodes {
        ...CompanyOverviewClientContactFragment
      }
      totalCount
    }
    operations {
      updateCompanyRepresentativePhoneNumbers {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${COMPANY_OVERVIEW_CLIENT_CONTACT_FRAGMENT}
`
