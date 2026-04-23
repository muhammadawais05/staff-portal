import gql from 'graphql-tag'

export default gql`
  mutation SetUnverifyWireBillingOption(
    $input: UnverifyWireBillingOptionInput!
  ) {
    unverifyWireBillingOption(input: $input) {
      success
      errors {
        key
        code
        message
      }
    }
  }
`
