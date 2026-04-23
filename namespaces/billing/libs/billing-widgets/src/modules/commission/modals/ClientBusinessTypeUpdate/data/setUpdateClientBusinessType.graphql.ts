import gql from 'graphql-tag'

import { userErrorFragment } from '../../../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientBusinessType($input: UpdateClientBusinessTypeInput!) {
    updateClientBusinessType(input: $input) {
      success
      errors {
        ...UserErrorFragment
      }
    }
  }

  ${userErrorFragment}
`
