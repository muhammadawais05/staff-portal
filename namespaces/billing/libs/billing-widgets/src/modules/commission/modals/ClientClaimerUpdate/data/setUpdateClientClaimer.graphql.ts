import gql from 'graphql-tag'

import { commissionsRoleFragment } from '../../../../__fragments__/commissionsRoleFragment.graphql'
import { userErrorFragment } from '../../../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientClaimer($input: UpdateClientClaimerInput!) {
    updateClientClaimer(input: $input) {
      success
      errors {
        ...UserErrorFragment
      }
      client {
        id
        claimer {
          ...CommissionsRole
        }
      }
      nextActionPerformable
    }
  }

  ${commissionsRoleFragment}
  ${userErrorFragment}
`
