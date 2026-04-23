import { gql } from '@apollo/client'

export default gql`
  mutation SetUpdateClientBillingAddress(
    $input: UpdateClientBillingAddressInput!
  ) {
    updateClientBillingAddress(input: $input) {
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }
`
