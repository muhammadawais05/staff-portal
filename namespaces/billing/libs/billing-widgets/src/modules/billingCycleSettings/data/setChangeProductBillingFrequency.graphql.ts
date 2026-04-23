import { gql } from '@apollo/client'

export default gql`
  mutation SetChangeProductBillingFrequency(
    $input: ChangeProductBillingFrequencyInput!
  ) {
    changeProductBillingFrequency(input: $input) {
      engagement {
        id
        billDay
        billCycle
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
