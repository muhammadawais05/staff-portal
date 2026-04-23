import { gql } from '@apollo/client'

export default gql`
  query GetRevertMemorandum($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Memorandum {
        id
        balance
        amount
        number
        document {
          id
          documentNumber
        }
        receiver {
          ... on Client {
            id
            fullName
          }
          ... on Talent {
            id
            fullName
          }
          ... on TalentPartner {
            id
            fullName
          }
          ... on Staff {
            id
            fullName
          }
          ... on ReferralPartner {
            id
            fullName
          }
          ... on Leader {
            id
            fullName
          }
          ... on CompanyRepresentative {
            id
            fullName
          }
        }
      }
    }
  }
`
