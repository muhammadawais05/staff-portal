import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation ReverifyCreditCardBillingOption(
    $input: ReverifyCreditCardBillingOptionInput!
  ) {
    reverifyCreditCardBillingOption(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      billingOption {
        id
      }
    }
  }

  ${userErrorFragment}
`
