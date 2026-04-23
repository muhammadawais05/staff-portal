import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientCollectionSpeed(
    $input: UpdateClientCollectionSpeedInput!
  ) {
    updateClientCollectionSpeed(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      client {
        id
        collectionSpeed
      }
    }
  }

  ${userErrorFragment}
`
