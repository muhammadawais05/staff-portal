import { gql } from '@staff-portal/data-layer-service'
import { COMPANY_CURRENT_INVESTIGATION_FRAGMENT } from '@staff-portal/clients'

export const UNRESOLVED_CLIENT_POSSIBLE_DUPLICATES_FRAGMENT = gql`
  fragment unresolvedClientPossibleDuplicatesFragment on Client {
    unresolvedPossibleDuplicates {
      edges {
        node {
          ...CompanyCurrentInvestigation
          id
          cumulativeStatus
          webResource {
            text
            url
          }
        }
        explanation
      }
    }
  }
  ${COMPANY_CURRENT_INVESTIGATION_FRAGMENT}
`
