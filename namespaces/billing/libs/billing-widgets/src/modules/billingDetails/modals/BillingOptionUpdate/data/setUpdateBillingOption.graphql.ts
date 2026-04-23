import gql from 'graphql-tag'

import { userErrorFragment } from '../../../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateBillingOption($input: UpdateBillingOptionInput!) {
    updateBillingOption(input: $input) {
      success
      errors {
        ...UserErrorFragment
      }
    }
  }

  ${userErrorFragment}
`
