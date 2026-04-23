import { gql } from '@apollo/client'

export default gql`
  query GetUpdateClientBillingAddress($id: ID!) {
    node(id: $id) {
      ... on Client {
        id
        billingAdditionalInfo
        billingAddress
        billingName
        billingCity
        billingZip
        billingState
        billingCountry {
          id
          name
        }
        billingPhone
        fullName
      }
    }
  }
`
