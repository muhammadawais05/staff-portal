import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientNetTerms($input: UpdateClientNetTermsInput!) {
    updateClientNetTerms(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      client {
        id
        netTerms
      }
    }
  }

  ${userErrorFragment}
`
