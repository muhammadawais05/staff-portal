import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientAutoAllocateMemos(
    $input: UpdateClientAutoAllocateMemosInput!
  ) {
    updateClientAutoAllocateMemos(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      client {
        id
        autoAllocateMemos
      }
    }
  }

  ${userErrorFragment}
`
