import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation RemoveEnterpriseBillingOption(
    $input: RemoveEnterpriseBillingOptionInput!
  ) {
    removeEnterpriseBillingOption(input: $input) {
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
