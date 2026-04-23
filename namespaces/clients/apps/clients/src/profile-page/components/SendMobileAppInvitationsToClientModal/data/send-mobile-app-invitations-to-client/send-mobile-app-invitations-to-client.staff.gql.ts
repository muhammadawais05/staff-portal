import { useMutation, gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { SendMobileAppInvitationsToClientDocument } from './send-mobile-app-invitations-to-client.staff.gql.types'

export default gql`
  mutation SendMobileAppInvitationsToClient($input: SendMobileAppInvitationsToClientInput!) {
    sendMobileAppInvitationsToClient(input: $input) {
      client {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSendMobileAppInvitationsToClient = () =>
  useMutation(SendMobileAppInvitationsToClientDocument)
