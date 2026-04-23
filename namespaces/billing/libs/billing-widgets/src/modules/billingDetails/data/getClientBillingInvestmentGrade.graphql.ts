import { gql } from '@apollo/client'

export default gql`
  query GetClientBillingInvestmentGrade($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        investmentGrade
      }
    }
  }
`
