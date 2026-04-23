import { gql } from '@staff-portal/data-layer-service'

import { COMPANY_OVERVIEW_CLIENT_CONTACT_FRAGMENT } from './company-overview-client-contact-fragment.staff.gql'

export default gql`
  query GetClientPhoneContacts($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        contact {
          id
          orderedPhoneNumbers {
            nodes {
              ...CompanyOverviewClientContactFragment
            }
            totalCount
          }
        }
      }
    }
  }

  ${COMPANY_OVERVIEW_CLIENT_CONTACT_FRAGMENT}
`
