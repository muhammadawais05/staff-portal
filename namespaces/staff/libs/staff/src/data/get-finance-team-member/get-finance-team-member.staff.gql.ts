import { gql } from '@staff-portal/data-layer-service'

import { STAFF_USER_FRAGMENT } from '..'

export default gql`
  query GetFinanceTeamMember($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        financeTeamMember {
          ...StaffUserFragment
        }
      }
    }
  }
  ${STAFF_USER_FRAGMENT}
`
