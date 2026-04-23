import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetLogClientBillingInformation(
    $input: LogClientBillingInformationInput!
  ) {
    logClientBillingInformation(input: $input) {
      notice
      success
      errors {
        ...UserErrorFragment
      }
    }
  }

  ${userErrorFragment}
`
