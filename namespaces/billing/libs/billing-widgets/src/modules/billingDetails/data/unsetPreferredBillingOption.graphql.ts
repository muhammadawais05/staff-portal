import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation UnsetPreferredBillingOption(
    $input: UnsetPreferredBillingOptionInput!
  ) {
    unsetPreferredBillingOption(input: $input) {
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
