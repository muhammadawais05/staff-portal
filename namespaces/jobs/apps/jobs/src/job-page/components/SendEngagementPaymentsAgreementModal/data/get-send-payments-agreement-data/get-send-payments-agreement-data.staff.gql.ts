import { gql } from '@staff-portal/data-layer-service'

export const GET_SEND_PAYMENTS_AGREEMENT_DATA = gql`
  query GetSendPaymentsAgreement($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        talent {
          id
          fullName
        }
        client {
          id
          fullName
        }
        job {
          id
          title
        }
      }
    }
  }
`
