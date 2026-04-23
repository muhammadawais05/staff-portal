import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetRestoreCompanyFromBlackFlagModalData($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        previousStatus
        previousBlackFlagComment
      }
    }
  }
`
