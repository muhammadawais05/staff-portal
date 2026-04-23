import gql from 'graphql-tag'

export default gql`
  mutation SetVerifyWireBillingOption($input: VerifyWireBillingOptionInput!) {
    verifyWireBillingOption(input: $input) {
      success
      errors {
        key
        code
        message
      }
    }
  }
`
